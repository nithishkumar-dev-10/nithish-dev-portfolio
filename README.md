<div align="center">

<img src="https://img.shields.io/badge/●-Live_Portfolio-4fffb0?style=flat-square&labelColor=07090d" />

# Nithish Kumar — Portfolio

**A single-page developer portfolio.** Vanilla HTML/CSS/JS, no framework, no build step — built for speed, motion, and a terminal-flavored visual identity.

[**🔗 Live Site**](https://nithishkumar-dev-10.github.io/nithish-dev-portfolio/) · [Run Locally](#-running-locally) · [Structure](#-file-structure)

</div>

---

## 🧱 Stack

No React, no bundler, no node_modules. Just three files doing all the work.

| File | Role |
|---|---|
| `index.html` | Markup — 6 sections, semantic, single page |
| `style.css` | All visual design — theme variables, layout, animation |
| `script.js` | All behavior — particles, cursor, reveal-on-scroll, typed text, form handling |

```
Fonts:   DM Mono · Syne · Plus Jakarta Sans  (Google Fonts, async-loaded)
Theme:   --accent: #4fffb0   (mint-green-on-dark)
Build:   none — open index.html and it just works
```

---

## ✨ What's Actually Running Under the Hood

This isn't just a static page with a CSS theme slapped on — there's real interaction logic in `script.js`:

- **Canvas particle network** in the hero — 55 particles, mouse-repulsion physics, proximity-based connecting lines, all hand-rolled on `<canvas>` (no library)
- **Custom dual cursor** — a sharp dot + a lazily-easing follower ring (`lerp` factor `0.1` per frame)
- **Scroll-spy navbar** — active nav link updates based on `scrollY` vs. each section's `offsetTop`
- **IntersectionObserver-driven reveals** — `.reveal-up` elements animate in once, then unobserve themselves (no repeated re-triggering, no scroll-jank)
- **Typed-text loop** in the hero terminal, cycling through role titles letter by letter
- **Contact form** — validates client-side, then opens a pre-filled Gmail compose window (no backend, no email service dependency)
- **Loader → reveal handoff** — a 1.2s loader gates `initReveal()` and `startTyped()` so animations don't fire before the DOM is visually ready

Everything is wrapped in a single `DOMContentLoaded` listener with defensive `if (el)` checks throughout, so missing elements fail silently instead of throwing.

---

## 🗺️ Sections

| # | Section | What's in it |
|---|---|---|
| 01 | **About** | Bio, current focus (RAG / MCP agents / LLM eval), stat blocks, LexTrack-AI architecture diagram |
| 02 | **Skills** | AI/ML, Backend, Tools & Infra, Frontend — grouped skill cards with mouse-glow hover effect |
| 03 | **Achievements** | Epochon Hackathon 1st-place hero feature, IIT Bombay Techfest, amFOSS open-source milestone |
| 04 | **Projects** | LexTrack-AI (featured), Kitchen Stock AI, TransReliant, Cafe Order & Booking |
| 05 | **Open Source** | Real merged PRs — memtomem-stm, TheGittyPerson/ThePerson, hackdartstorm/Python |
| 06 | **Contact** | Direct links + a client-side contact form that hands off to Gmail |

---

## 🖥️ Running Locally

No install, no build:

```bash
git clone https://github.com/nithishkumar-dev-10/nithish-dev-portfolio.git
cd nithish-dev-portfolio
open index.html        # or just double-click it
```

For live-reload while editing, any static server works:

```bash
python -m http.server 8000
# → http://localhost:8000
```

---

## 📁 File Structure

```
nithish-dev-portfolio/
├── index.html      # all markup — hero, about, skills, achievements, projects, open source, contact
├── style.css       # theme + layout + animation
├── script.js       # all interactivity (DOMContentLoaded-wrapped)
└── README.md
```

---

## 🚀 Deployment

Hosted on **GitHub Pages** — push to `main`, no build step required, live within minutes.

---

<div align="center">

**[nithishkumar-dev-10.github.io/nithish-dev-portfolio](https://nithishkumar-dev-10.github.io/nithish-dev-portfolio/)**

Built by [Nithish Kumar](https://github.com/nithishkumar-dev-10)

</div>
