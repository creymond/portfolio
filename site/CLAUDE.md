# CLAUDE.md

Project-level guidance for Claude Code. Read this before doing anything in this repo.

## What this project is

A **single-page personal portfolio website** built with **Astro**. The visual source of truth is the design PNG in `/design/`. Scope is intentionally narrow: build the site, nothing else.

## Out of scope (do not touch)

- Git, GitHub, branches, commits, PRs — the user handles version control manually.
- Deployment, hosting, CDN, DNS, Terraform, Docker, CI/CD.
- Analytics, tracking, A/B testing, CMS integrations.
- Anything that is not strictly producing the website's code.

If a task drifts toward any of the above, stop and ask the user before proceeding.

## Tech stack

- **Framework**: Astro (latest)
- **Language**: TypeScript where it helps, plain `.astro` otherwise
- **Styling**: scoped `<style>` per component + a single `src/styles/global.css` for tokens (colors, spacing, typography, breakpoints)
- **No framework integrations** (React/Vue/Svelte) unless a specific interaction truly requires it. Default to static Astro.
- **No CSS framework** unless the user asks for one. If they do, prefer Tailwind and integrate it the standard Astro way.

## Workflow — three agents

This project uses three subagents in `.claude/agents/`. Use them in this order:

1. **`planner`** — reads `/design/`, breaks the work into ordered tasks with acceptance criteria. No code.
2. **`developer`** — implements one task at a time. Writes Astro components, styles, and wires them into `index.astro`. Runs `npm run build` to verify.
3. **`reviewer`** — checks the developer's output against the design, the plan, accessibility, responsive behavior, and build health. Returns PASS or CHANGES REQUESTED.

Loop: **plan → build → review → fix → review → next task.** Do not skip the reviewer.

When the user says "build the next section" or similar without specifying an agent, start with the planner if there is no active plan, otherwise hand to the developer.

## Conventions

- **One page**: `src/pages/index.astro` composes section components from `src/components/`.
- **One section per component**: `Hero.astro`, `About.astro`, `Repositories.astro`, `Tech.Stack.astro`, `Experience.astro` `Contact.astro`, etc. — small and focused.
- **Layout**: shared `<head>`, fonts, and meta tags live in `src/layouts/Base.astro`.
- **Tokens**: define colors, spacing scale, font stacks, and breakpoints once in `src/styles/global.css` as CSS custom properties. Components consume them; never hardcode hex values inside components.
- **Images**: use `astro:assets` `<Image />` for local images. Always set `alt`. Store originals in `src/assets/` (optimized by Astro) or `public/` (served as-is).
- **Fonts**: self-host in `public/fonts/`, preload in `Base.astro`.
- **Accessibility is a requirement, not a bonus**: semantic landmarks, one `<h1>`, real heading order, visible focus states, sufficient contrast.
- **Responsive**: mobile-first. Target ~375px, ~768px, ~1280px. Use fluid type (`clamp()`) where it fits.

## Commands

- `npm install` — install deps
- `npm run dev` — local dev server
- `npm run build` — production build (must pass before any review hands back PASS)
- `npm run preview` — preview the built site
- `npm run astro check` — type/diagnostic check (run if available)

## Working with the design

- The design PNG lives in `/design/`. Treat the most recently modified file as authoritative unless the user says otherwise.
- The design shows intent, not pixel law. Match structure, hierarchy, spacing rhythm, and tone. Do not chase 1px perfection at the cost of clean code.
- If something in the design is ambiguous (hover states, mobile layout, copy), surface it as a question rather than guessing silently.

## House rules for any agent

- Read files before editing them. Glob before creating to avoid duplicates.
- Do not install packages without asking.
- Do not refactor code that is not part of the current task.
- Do not invent features that are not in the design.
- Keep responses focused: what you did, which files changed, what is next.
