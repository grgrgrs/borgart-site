# IG Courses / Classes Concept — Interactive Prototype

A high-fidelity, responsive HTML/CSS/JS discussion concept for the IG
Management Group Courses / Classes page. No build step, no backend, no
localStorage — pure static files ready to place on a hidden/unlisted page.

This version is intentionally conservative for pre-meeting review: final
booking, payment, and registration flow is not assumed.

## Run locally

```bash
cd ig-courses-prototype
python3 -m http.server 5000
# open http://localhost:5000
```

## File layout

```
ig-courses-prototype/
├── index.html          # Markup, header, hero, sections, modal
├── styles.css          # Design tokens + component styles
├── app.js              # Search/filter/expand/modal logic (vanilla JS)
├── build_data.py       # Regenerates data/site-data.js from the JSON source
├── data/
│   ├── courses.json    # Source data (copied from ig_group_course_data.json)
│   └── site-data.js    # Generated bundle: courses + partner catalog + lessons
└── README.md
```

## Updating course data

Course data ships from the spreadsheet via JSON:

1. Replace `data/courses.json` with the latest export (same shape as
   `ig_group_course_data.json`).
2. To edit the **English & Technology lessons**, edit the `lessons` block at
   the top of `build_data.py`. The partner catalog data still exists in the
   file, but the section is hidden in this pre-meeting concept.
3. Run `python3 build_data.py` to regenerate `data/site-data.js`.
4. Reload the browser. No build pipeline, no compile step.

## Sections

- **Hero** — discussion framing, concept note, jump links, KPI strip.
- **Instructor-led Certification Bootcamps** — searchable, filterable catalog
  of all 15 Cisco / CompTIA / EC-Council / ISC2 courses from the spreadsheet.
- **English & Technology Lessons** — English Course plus Computer & Cell Phone
  Classes and Personalized Technology Lesson for Beginners, shown in the same
  education/classes area for discussion.
- **Final CTA** — routes to a safe request-program-info concept rather than
  assuming live booking or payment.

Exams, fingerprinting, drug screening, notary, and other unrelated services are
not shown in this pre-meeting version.

## Interactivity

| Behavior                          | Where                                   |
| --------------------------------- | --------------------------------------- |
| Live text search                  | `[data-testid="input-search"]`          |
| Filter by category / vendor / level| `[data-testid^="select-"]`             |
| Live result count                 | `[data-testid="text-result-count"]`    |
| Active-filter chips + clear-all   | `[data-testid="region-chips"]`         |
| Empty state with reset            | `[data-testid="region-empty"]`         |
| Expand syllabus + all dates       | `[data-testid^="button-expand-"]`      |
| Check Availability modal          | `[data-testid^="button-check-"]`       |
| Modal date picker (radio rows)    | `[data-testid^="date-row-"]`           |
| Modal form (no submit)            | `[data-testid^="input-modal-"]`        |
| Mobile nav drawer                 | `[data-testid="button-menu-toggle"]`   |

Lesson cards open the same modal in a non-committal program-info mode. The
prototype does not assume that booking calendars, payment, or confirmation are
final.

Every interactive element has a `data-testid`.

## Design decisions

- **Palette** — deep navy (`#0B1B2B`) + charcoal ink + clean white surfaces,
  with a single teal CTA accent (`#138A99`) and a restrained gold availability
  highlight (`#D4A017`). Greens are reserved for success/confirmation.
- **Type** — Manrope from Fontshare (300/500/700/800), one family across
  display + body. Tabular numerics on prices and dates.
- **Logo** — inline SVG "IG" mark (solid I bar + open-G ring with notch). No
  generated illustrations or stock imagery anywhere.
- **Layout** — 1200px container, 3-up course grid that collapses to 2-up at
  1080px and 1-up at 680px. Lesson cards collapse the same way.
- **Modal** — slides in as a right-side drawer on desktop, becomes a bottom
  sheet on phones (≤ 600px). Closes on Esc, backdrop click, or Cancel.
- **Accessibility** — visible focus ring on every interactive element, semantic
  buttons / radios / labels, `aria-expanded` on the expand toggle and mobile
  menu, `prefers-reduced-motion` respected, contrast verified for body text.
- **No storage** — no localStorage, sessionStorage, IndexedDB, or cookies
  anywhere; transient state is held in plain JS objects.

## Recommended follow-ups

1. **Decide registration flow**: inquiry only, staff-approved booking,
   WooCommerce booking, payment online, or payment outside the website.
2. **Replace placeholder phone/email** in the topbar with the IG Group's real
   contact details.
3. **Only add exams/services** if the client confirms they belong on the
   Courses / Classes page.
4. **Add a "Compare" tray** if multiple bootcamps need side-by-side review;
   the card structure already supports it.
5. **Internationalize Spanish OSHA copy** so bilingual users can switch the
   whole catalog, not just the OSHA tiles.

## QA notes

Manually verified in Playwright at 1280×900 and 390×844:

- Search "ccna" → 1 result, chip appears, clear button visible.
- Category = Cybersecurity → 7 results.
- Cybersecurity + Vendor = Cisco → empty state, reset works.
- Card expand → syllabus + all 8 cohorts visible.
- Check Availability → modal opens with vendor/title, 8 cohort radios, focus
  jumps to name field, submit shows success banner, Esc closes.
- Lesson "Check Availability" → same modal, "Schedule by appointment" row.
- Mobile menu toggles, brand stays on one line, modal becomes a bottom sheet.

Screenshots saved to `/home/user/workspace/qa_*.png` and `/home/user/workspace/qa[1-9]_*.png`.
