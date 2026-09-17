from pathlib import Path


root = Path(__file__).resolve().parents[1]


def replace_exact(path, old, new, expected=1):
    source = path.read_text(encoding="utf-8")
    found = source.count(old)
    if found != expected:
        raise RuntimeError(f"Expected {expected} matches in {path}, found {found}: {old[:80]}")
    path.write_text(source.replace(old, new), encoding="utf-8", newline="\n")


home = root / "index.html"
home_description = (
    "Diseñamos páginas web, marcas y sistemas de marketing para que negocios en Guatemala "
    "se vean mejor, aparezcan en Google y conviertan visitas en consultas."
)
replace_exact(
    home,
    '<meta name="description" content="Diseño web, logotipos, email marketing, SEO local y automatización para negocios en Guatemala.">',
    f'<meta name="description" content="{home_description}">',
)
replace_exact(
    home,
    '<meta property="og:description" content="Diseño web, logotipos, email marketing, SEO local y automatización para negocios en Guatemala.">',
    f'<meta property="og:description" content="{home_description}">',
)
replace_exact(
    home,
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preload" as="image" href="/assets/people-cafe-1280.webp" imagesrcset="/assets/people-cafe-640.webp 640w, /assets/people-cafe-1280.webp 1280w" imagesizes="100vw" fetchpriority="high">',
)

services = root / "servicios" / "index.html"
replace_exact(
    services,
    "Diseño web, logotipos y marketing en Guatemala | Lumix Studio",
    "Servicios digitales en Guatemala | Lumix Studio",
    expected=4,
)
replace_exact(
    services,
    "Diseño web, logotipos, email marketing, SEO local y automatización para negocios en Guatemala.",
    "Explora diseño web, logotipos, email marketing, SEO local y automatización creados por Lumix Studio para fortalecer negocios en Guatemala.",
    expected=4,
)

print("SEO metadata and homepage image preload updated.")
