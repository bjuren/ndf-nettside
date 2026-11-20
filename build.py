#!/usr/bin/env python3
"""Bygger den statiske nettsiden til docs/ (klar for GitHub Pages).

Hver side i src/pages starter med en kommentar:
<!-- title: Sidetittel | page: id | nav: terminliste | desc: Beskrivelse -->
Kjør: python3 build.py
"""
import math
import pathlib
import re
import shutil

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"
OUT = ROOT / "docs"

NAV = [
    ("terminliste.html", "Terminliste"),
    ("resultater.html", "Resultater"),
    ("rangering.html", "Rangering"),
    ("klubber.html", "Finn klubb"),
    ("bli-med.html", "Bli med"),
    ("nyheter.html", "Nyheter"),
    ("om-ndf.html", "Om NDF"),
]

# Standard dartboard order, clockwise from the top
ORDER = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5]
# Regulation radii (mm): bull 6.35, outer bull 15.9, treble 99-107, double 162-170
R = dict(bull=6.35, obull=15.9, t_in=99, t_out=107, d_in=162, d_out=170, edge=225)
C = dict(red="#c8102e", green="#146b45", black="#000000", sisal="#e8dcc2", wire="#b9b2a2")


def pt(r, deg):
    a = math.radians(deg - 90)
    return f"{r * math.cos(a):.2f} {r * math.sin(a):.2f}"


def wedge(r1, r2, a1, a2, fill, cls=""):
    c = f' class="{cls}"' if cls else ""
    return (f'<path{c} fill="{fill}" d="M{pt(r1, a1)} L{pt(r2, a1)} A{r2} {r2} 0 0 1 {pt(r2, a2)} '
            f'L{pt(r1, a2)} A{r1} {r1} 0 0 0 {pt(r1, a1)}Z"/>')


def board(with_numbers=True, with_dart=False, title="Dartskive"):
    parts = []
    edge = R["edge"] if with_numbers else R["d_out"] + 6
    parts.append(f'<circle r="{edge}" fill="{C["black"]}"/>')
    for i, n in enumerate(ORDER):
        a1, a2 = i * 18 - 9, i * 18 + 9
        single = C["black"] if i % 2 == 0 else C["sisal"]
        ring = C["red"] if i % 2 == 0 else C["green"]
        parts.append(wedge(R["obull"], R["t_in"], a1, a2, single))
        parts.append(wedge(R["t_in"], R["t_out"], a1, a2, ring, "t20-hit" if (n == 20 and with_dart) else ""))
        parts.append(wedge(R["t_out"], R["d_in"], a1, a2, single))
        parts.append(wedge(R["d_in"], R["d_out"], a1, a2, ring))
    # wire
    for r in (R["obull"], R["t_in"], R["t_out"], R["d_in"], R["d_out"]):
        parts.append(f'<circle r="{r}" fill="none" stroke="{C["wire"]}" stroke-width="0.8"/>')
    for i in range(20):
        a = i * 18 - 9
        parts.append(f'<line x1="{pt(R["obull"], a).split()[0]}" y1="{pt(R["obull"], a).split()[1]}" '
                     f'x2="{pt(R["d_out"], a).split()[0]}" y2="{pt(R["d_out"], a).split()[1]}" stroke="{C["wire"]}" stroke-width="0.8"/>')
    parts.append(f'<circle r="{R["obull"]}" fill="{C["green"]}" stroke="{C["wire"]}" stroke-width="0.8"/>')
    parts.append(f'<circle r="{R["bull"]}" fill="{C["red"]}"/>')
    if with_numbers:
        for i, n in enumerate(ORDER):
            x, y = pt(197, i * 18).split()
            parts.append(f'<text x="{x}" y="{y}" fill="#fff" font-size="26" font-weight="800" '
                         f'text-anchor="middle" dominant-baseline="central" font-family="Archivo, sans-serif" '
                         f'style="font-variation-settings:\'wdth\' 110">{n}</text>')
    if with_dart:
        parts.append(
            '<g class="dart"><g transform="translate(0 -103) rotate(-38) scale(1.35)">'
            '<line x1="0" y1="0" x2="34" y2="0" stroke="#c9ced6" stroke-width="2.5" stroke-linecap="round"/>'
            '<rect x="32" y="-5.5" width="58" height="11" rx="4" fill="#8d96a3"/>'
            '<g stroke="#5f6874" stroke-width="1.4">'
            + "".join(f'<line x1="{x}" y1="-5" x2="{x}" y2="5"/>' for x in range(40, 86, 6))
            + '</g>'
            '<rect x="88" y="-3" width="46" height="6" rx="2" fill="#13203a" stroke="#fff" stroke-width="1"/>'
            '<path d="M126 0 L168 -26 L178 -26 L160 0 L178 26 L168 26 Z" fill="#c8102e" stroke="#fff" stroke-width="1.5"/>'
            '<line x1="126" y1="0" x2="176" y2="0" stroke="#fff" stroke-width="1.5"/>'
            '</g></g>')
    vb = f"{-edge - (0 if not with_dart else 10)} {-edge - (0 if not with_dart else 150)} {2 * edge + (0 if not with_dart else 160)} {2 * edge + (0 if not with_dart else 150)}"
    label = f'role="img" aria-label="{title}"' if title else 'aria-hidden="true" class="mc-board"'
    return (f'<svg viewBox="{vb}" {label} xmlns="http://www.w3.org/2000/svg">'
            + "".join(parts) + "</svg>")


MARK = ('<svg viewBox="-50 -50 100 100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">'
        '<circle r="48" fill="#fff"/><circle r="40" fill="#c8102e"/><circle r="32" fill="#fff"/>'
        '<circle r="22" fill="#146b45"/><circle r="12" fill="#fff"/><circle r="6" fill="#c8102e"/></svg>')


def main():
    head = (SRC / "partials/head.html").read_text(encoding="utf-8")
    foot = (SRC / "partials/foot.html").read_text(encoding="utf-8")
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    shutil.copytree(ROOT / "assets", OUT / "assets")
    (OUT / "assets/favicon.svg").write_text(MARK.replace('aria-hidden="true" ', ""), encoding="utf-8")
    (OUT / ".nojekyll").write_text("", encoding="utf-8")

    hero_board = board(with_numbers=True, with_dart=True, title="Dartskive med en pil i trippel 20")
    card_board = board(with_numbers=False, title="")

    for page in sorted((SRC / "pages").glob("*.html")):
        raw = page.read_text(encoding="utf-8")
        m = re.match(r"<!--(.*?)-->\s*", raw, re.S)
        meta = dict(p.split(":", 1) for p in m.group(1).split("|"))
        meta = {k.strip(): v.strip() for k, v in meta.items()}
        body = raw[m.end():]
        nav = "\n        ".join(
            f'<li><a href="{href}"{" aria-current=\"page\"" if meta.get("nav") == href.split(".")[0] else ""}>{label}</a></li>'
            for href, label in NAV)
        html = (head.replace("{{title}}", meta["title"]).replace("{{desc}}", meta["desc"])
                .replace("{{page}}", meta["page"]).replace("{{nav}}", nav).replace("{{mark}}", MARK)
                + body + foot)
        html = html.replace("{{board}}", hero_board).replace("{{card_board}}", card_board)
        (OUT / page.name).write_text(html, encoding="utf-8")
        print("bygget", page.name)


if __name__ == "__main__":
    main()
