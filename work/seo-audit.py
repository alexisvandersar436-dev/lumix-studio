from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
from xml.etree import ElementTree
import json
import re


ROOT = Path(__file__).resolve().parents[1]
DOMAIN = "lumixstudio.co"


class AuditPage(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.in_title = False
        self.meta = {}
        self.canonical = ""
        self.headings = []
        self.heading = None
        self.images = []
        self.links = []
        self.schemas = []
        self.schema = None
        self.html_lang = ""

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "html":
            self.html_lang = values.get("lang", "")
        elif tag == "title":
            self.in_title = True
        elif tag == "meta":
            key = values.get("name") or values.get("property")
            if key:
                self.meta[key.lower()] = values.get("content", "").strip()
        elif tag == "link" and "canonical" in values.get("rel", "").split():
            self.canonical = values.get("href", "").strip()
        elif re.fullmatch(r"h[1-6]", tag):
            self.heading = [int(tag[1]), ""]
        elif tag == "img":
            self.images.append(values)
        elif tag == "a" and values.get("href"):
            self.links.append(values["href"].strip())
        elif tag == "script" and values.get("type") == "application/ld+json":
            self.schema = ""

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.heading is not None:
            self.heading[1] += data
        if self.schema is not None:
            self.schema += data

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        elif re.fullmatch(r"h[1-6]", tag) and self.heading is not None:
            self.headings.append((self.heading[0], self.heading[1].strip()))
            self.heading = None
        elif tag == "script" and self.schema is not None:
            self.schemas.append(json.loads(self.schema))
            self.schema = None


def route_for(file):
    if file == ROOT / "index.html":
        return "/"
    return "/" + file.parent.relative_to(ROOT).as_posix() + "/"


def local_route(href):
    parsed = urlparse(href)
    if parsed.scheme and parsed.hostname != DOMAIN:
        return None
    if parsed.hostname == DOMAIN or href.startswith("/"):
        path = parsed.path or "/"
        return path if path.endswith("/") or "." in Path(path).name else path + "/"
    return None


files = [ROOT / "index.html", *sorted(ROOT.glob("*/index.html"))]
pages = {}
issues = []
warnings = []

for file in files:
    page = AuditPage()
    page.feed(file.read_text(encoding="utf-8"))
    route = route_for(file)
    pages[route] = page

    def issue(message):
        issues.append(f"{route}: {message}")

    def warn(message):
        warnings.append(f"{route}: {message}")

    title = page.title.strip()
    description = page.meta.get("description", "")
    if not 30 <= len(title) <= 60:
        warn(f"title length is {len(title)} characters")
    if not 120 <= len(description) <= 165:
        warn(f"description length is {len(description)} characters")
    if page.meta.get("robots", "").lower().find("noindex") >= 0:
        issue("contains noindex")
    if page.canonical != f"https://{DOMAIN}{route}":
        issue(f"canonical mismatch: {page.canonical}")
    if not page.html_lang.lower().startswith("es"):
        issue(f"expected a Spanish language code, found {page.html_lang!r}")
    if len([heading for heading in page.headings if heading[0] == 1]) != 1:
        issue("must contain exactly one H1")
    if any(not text for _, text in page.headings):
        issue("contains an empty heading")
    for before, after in zip(page.headings, page.headings[1:]):
        if after[0] > before[0] + 1:
            issue(f"heading hierarchy skips H{before[0]} to H{after[0]}")
    required_social = ("og:title", "og:description", "og:image", "og:image:alt", "og:url", "twitter:card", "twitter:title", "twitter:description", "twitter:image")
    for key in required_social:
        if not page.meta.get(key):
            issue(f"missing {key}")
    if page.meta.get("og:url") != page.canonical:
        issue("og:url does not match canonical")
    if not page.schemas:
        issue("missing JSON-LD")
    schema_types = set()
    for schema in page.schemas:
        entries = schema.get("@graph", [schema]) if isinstance(schema, dict) else []
        for entry in entries:
            schema_type = entry.get("@type") if isinstance(entry, dict) else None
            if isinstance(schema_type, list):
                schema_types.update(schema_type)
            elif schema_type:
                schema_types.add(schema_type)
    if "WebPage" not in schema_types:
        issue("JSON-LD is missing WebPage schema")
    for image in page.images:
        if not image.get("alt", "").strip():
            issue(f"image missing descriptive alt text: {image.get('src', '')}")
        if not image.get("width") or not image.get("height"):
            issue(f"image missing dimensions: {image.get('src', '')}")
        if image.get("src", "").lower().endswith((".jpg", ".jpeg", ".png")):
            warn(f"image is not a modern format: {image.get('src', '')}")
    if len(page.links) > 100:
        warn(f"contains {len(page.links)} links")


for label, values in (
    ("title", [page.title.strip() for page in pages.values()]),
    ("description", [page.meta.get("description", "") for page in pages.values()]),
    ("canonical", [page.canonical for page in pages.values()]),
):
    if len(values) != len(set(values)):
        issues.append(f"duplicate {label} values found across pages")


known_routes = set(pages)
inbound = {route: 0 for route in known_routes}
internal_links = 0
external_links = set()
for route, page in pages.items():
    for href in page.links:
        target = local_route(href)
        if target is None:
            if href.startswith(("https://", "http://")):
                external_links.add(href)
            continue
        parsed = urlparse(href)
        if parsed.path.startswith("/assets/"):
            continue
        internal_links += 1
        if target not in known_routes:
            issues.append(f"{route}: broken internal link {href}")
        elif target != route:
            inbound[target] += 1

for route, count in inbound.items():
    if route != "/" and count == 0:
        issues.append(f"{route}: orphan page")

robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
if any(line.strip() == "Disallow: /" for line in robots.splitlines()):
    issues.append("robots.txt blocks the full site")
if f"Sitemap: https://{DOMAIN}/sitemap.xml" not in robots:
    issues.append("robots.txt does not reference the canonical sitemap")

tree = ElementTree.parse(ROOT / "sitemap.xml")
namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
sitemap_urls = {element.text for element in tree.findall("sm:url/sm:loc", namespace)}
expected_urls = {f"https://{DOMAIN}{route}" for route in known_routes}
if sitemap_urls != expected_urls:
    issues.append("sitemap URLs do not exactly match canonical indexable routes")
if any(element.find("sm:lastmod", namespace) is None for element in tree.findall("sm:url", namespace)):
    warnings.append("sitemap.xml: lastmod is missing")

all_source = "\n".join(file.read_text(encoding="utf-8") for file in files)
if "http://" in all_source:
    issues.append("HTML contains insecure http:// references")
if "google-site-verification" not in all_source:
    warnings.append("Google Search Console verification token is not installed")

print(json.dumps({
    "pages": len(pages),
    "metadata": {
        route: {
            "title": page.title.strip(),
            "title_length": len(page.title.strip()),
            "description": page.meta.get("description", ""),
            "description_length": len(page.meta.get("description", "")),
        }
        for route, page in pages.items()
    },
    "internal_links": internal_links,
    "external_links": sorted(external_links),
    "inbound_links": inbound,
    "issues": issues,
    "warnings": warnings,
}, ensure_ascii=False, indent=2))
raise SystemExit(bool(issues))
