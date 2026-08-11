# Hilal — Ramadan 2027 Countdown

A countdown page for Ramadan 2027, built to show real front-end craft: a hand-built digit-flip countdown (odometer-style, per-digit animation — no libraries), a quiet crescent-moon motif, and a fully responsive layout that adapts down to short viewports without ever needing to zoom or scroll.

**[Live demo →](https://jalilgs.github.io/ramadan-coming-soon-2/)** 
&nbsp;·&nbsp; Built with vanilla HTML, CSS and JavaScript — no frameworks, no build step.



## Why this project

Most countdown templates animate the whole number on every tick. This one animates only the digit that changed — the same trick real flip-clocks and odometers use — built from scratch with the DOM and CSS keyframes, no animation library involved.

Ramadan 2027 is expected to begin the evening of February 7th, with the first day of fasting on February 8th — the exact date is always confirmed closer to the time by moon sighting.

## Features

- **Digit-flip countdown** — each digit is diffed independently on every tick; unchanged digits never re-render or flicker
- **Crescent-moon signature element** — a custom SVG mark used as both the logo and a quiet ornamental divider
- **Viewport-aware layout** — spacing and type scale respond to viewport height (`clamp()` + `vh`), so the page fits without scrolling on short screens instead of silently clipping
- **Accessible by default** — labeled form input, `aria-live` semantics on the countdown region, and `prefers-reduced-motion` support
- **Zero dependencies** — no framework, no build tooling; open `index.html` and it runs

## Tech stack

`HTML5` · `CSS3 (custom properties, clamp, keyframes)` · `Vanilla JavaScript`

## Run locally

```bash
git clone https://github.com/jalilgs/ramadan-comming-soon-2.git
cd ramadan-comming-soon-2
open index.html
```

## License

MIT
