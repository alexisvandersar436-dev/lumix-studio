from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import json

root = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.refs = []
        self.images = []
        self.headings = []
        self.meta = {}
        self.canonical = ""
        self.title = ""
        self.in_title = False
        self.in_schema = False
        self.schema = ""
        self.schemas = []
        self.links = []
        self.text_chunks = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if "id" in attributes:
            self.ids.append(attributes["id"])
        if tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self.headings.append(int(tag[1]))
        if tag == "img":
            self.images.append(attributes)
        if tag == "meta":
            self.meta[attributes.get("name", attributes.get("property", ""))] = attributes.get("content", "")
        if tag == "link" and attributes.get("rel") == "canonical":
            self.canonical = attributes.get("href", "")
        for attribute in ("href", "src"):
            if attributes.get(attribute):
                self.refs.append(attributes[attribute])
        if tag == "a":
            self.links.append(attributes)
        if tag == "title":
            self.in_title = True
        if tag == "script" and attributes.get("type") == "application/ld+json":
            self.in_schema = True
            self.schema = ""

    def handle_data(self, text):
        self.text_chunks.append(text)
        if self.in_title:
            self.title += text
        if self.in_schema:
            self.schema += text

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        if tag == "script" and self.in_schema:
            self.schemas.append(json.loads(self.schema))
            self.in_schema = False


files = [root / "index.html"] + list(root.glob("*/index.html"))
failures = []
titles = set()
canonicals = set()
asset_count = 0

for file in files:
    page = Page()
    page.feed(file.read_text(encoding="utf-8"))

    def fail(message):
        failures.append(str(file.relative_to(root)) + ": " + message)

    if page.headings.count(1) != 1:
        fail("expected one H1")
    for before, after in zip(page.headings, page.headings[1:]):
        if after > before + 1:
            fail(f"heading skips {before} to {after}")
    if len(page.ids) != len(set(page.ids)):
        fail("duplicate IDs")
    if not page.title or page.title in titles:
        fail("missing/duplicate title")
    if not page.canonical or page.canonical in canonicals:
        fail("missing/duplicate canonical")
    titles.add(page.title)
    canonicals.add(page.canonical)
    if not page.meta.get("description"):
        fail("missing description")
    if "noindex" in page.meta.get("robots", ""):
        fail("production page marked noindex")
    if not page.schemas:
        fail("missing structured data")
    for image in page.images:
        if not all(image.get(key) for key in ("alt", "width", "height")):
            fail("incomplete image attributes")
    for link in page.links:
        if "wa.me/" in link.get("href", ""):
            rel = link.get("rel", "")
            if link.get("target") != "_blank" or "noopener" not in rel or "noreferrer" not in rel:
                fail("unsafe WhatsApp link attributes")
    for ref in page.refs + [page.meta.get("og:image", "")]:
        url = urlparse(ref)
        if ref == "#":
            fail("dead link")
        if ref.startswith("#") and url.fragment not in page.ids:
            fail("missing anchor " + ref)
        if (ref.startswith("/") and not ref.startswith("//")) or url.hostname == "lumixstudio.co":
            local = root / url.path.lstrip("/")
            if url.path.endswith("/"):
                local = local / "index.html"
            if not local.exists():
                fail("missing page/asset " + ref)
            asset_count += 1

sitemap = (root / "sitemap.xml").read_text(encoding="utf-8")
for canonical in canonicals:
    if canonical not in sitemap:
        failures.append("Sitemap missing " + canonical)

homepage = Page()
homepage.feed((root / "index.html").read_text(encoding="utf-8"))
homepage_text = " ".join(homepage.text_chunks)
for required in ("Solicitar cotización", "Ver proyectos", "Proyectos Lumix", "Diseño de logotipo", "Email marketing", "Néstor Ordóñez"):
    if required not in homepage_text:
        failures.append("Homepage missing required content: " + required)
for required_id in ("proyectos", "como-trabajamos"):
    if required_id not in homepage.ids:
        failures.append("Homepage missing required section: " + required_id)
if not (root / "conversion.css").exists():
    failures.append("Missing conversion.css")
if "plan-selection" in (root / "index.html").read_text(encoding="utf-8"):
    failures.append("Homepage still contains the full plan comparison")
all_html = "\n".join(file.read_text(encoding="utf-8") for file in files)
if all_html.count('plan-selection') != 1:
    failures.append("Plan comparison must appear exactly once across the site")
about_html = (root / "nosotros" / "index.html").read_text(encoding="utf-8")
if 'class="note-scroll"' in about_html or 'class="founder-intro' in about_html:
    failures.append("About page still contains a duplicate founder section")
if about_html.count('class="founder-story"') != 1:
    failures.append("About page must contain exactly one founder story")
if not (root / "revision.css").exists():
    failures.append("Missing revision.css")
for file in files:
    if any(symbol in file.read_text(encoding="utf-8") for symbol in ("↗", "→", "←", "↑")):
        failures.append("Decorative arrow remains in " + str(file.relative_to(root)))

print(json.dumps({
    "pages": len(files),
    "unique_titles": len(titles),
    "unique_canonicals": len(canonicals),
    "local_references_checked": asset_count,
    "failures": failures,
}, indent=2))
raise SystemExit(bool(failures))
