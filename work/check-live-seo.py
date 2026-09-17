from html.parser import HTMLParser
from urllib.request import Request, urlopen
import json


class Head(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta = {}
        self.canonical = ""

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "meta" and values.get("name"):
            self.meta[values["name"].lower()] = values.get("content", "")
        if tag == "link" and "canonical" in values.get("rel", "").split():
            self.canonical = values.get("href", "")


def fetch(url):
    request = Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; LumixSEOAudit/1.0)"})
    with urlopen(request, timeout=20) as response:
        return {
            "requested": url,
            "status": response.status,
            "final_url": response.geturl(),
            "hsts": response.headers.get("Strict-Transport-Security", ""),
            "content_type": response.headers.get("Content-Type", ""),
            "body": response.read().decode("utf-8", "replace"),
        }


home = fetch("https://lumixstudio.co/")
head = Head()
head.feed(home["body"])
robots = fetch("https://lumixstudio.co/robots.txt")
sitemap = fetch("https://lumixstudio.co/sitemap.xml")
variants = [fetch(url) for url in (
    "http://lumixstudio.co/",
    "http://www.lumixstudio.co/",
    "https://www.lumixstudio.co/",
)]

print(json.dumps({
    "home": {
        "status": home["status"],
        "final_url": home["final_url"],
        "hsts": home["hsts"],
        "robots_meta": head.meta.get("robots", ""),
        "canonical": head.canonical,
        "search_console_verification": bool(head.meta.get("google-site-verification")),
    },
    "robots": {
        "status": robots["status"],
        "references_sitemap": "Sitemap: https://lumixstudio.co/sitemap.xml" in robots["body"],
        "blocks_site": any(line.strip() == "Disallow: /" for line in robots["body"].splitlines()),
    },
    "sitemap": {
        "status": sitemap["status"],
        "url_count": sitemap["body"].count("<loc>"),
    },
    "domain_variants": [
        {"requested": item["requested"], "status": item["status"], "final_url": item["final_url"]}
        for item in variants
    ],
}, indent=2))
