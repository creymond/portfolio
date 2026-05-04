---
name: Technical Terminal
colors:
  surface: '#11131e'
  surface-dim: '#11131e'
  surface-bright: '#373845'
  surface-container-lowest: '#0b0e18'
  surface-container-low: '#191b26'
  surface-container: '#1d1f2b'
  surface-container-high: '#272935'
  surface-container-highest: '#323440'
  on-surface: '#e1e1f1'
  on-surface-variant: '#bbcbb8'
  inverse-surface: '#e1e1f1'
  inverse-on-surface: '#2e303c'
  outline: '#859583'
  outline-variant: '#3c4a3c'
  surface-tint: '#31e368'
  primary: '#e8ffe4'
  on-primary: '#003912'
  primary-container: '#50fa7b'
  on-primary-container: '#00702c'
  inverse-primary: '#006e2b'
  secondary: '#d7baff'
  on-secondary: '#411478'
  secondary-container: '#593090'
  on-secondary-container: '#caa4ff'
  tertiary: '#fff7f2'
  on-tertiary: '#492900'
  tertiary-container: '#ffd4ab'
  on-tertiary-container: '#89540f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#69ff88'
  primary-fixed-dim: '#31e368'
  on-primary-fixed: '#002108'
  on-primary-fixed-variant: '#00531e'
  secondary-fixed: '#eddcff'
  secondary-fixed-dim: '#d7baff'
  on-secondary-fixed: '#290055'
  on-secondary-fixed-variant: '#593090'
  tertiary-fixed: '#ffdcbc'
  tertiary-fixed-dim: '#ffb86c'
  on-tertiary-fixed: '#2c1600'
  on-tertiary-fixed-variant: '#683c00'
  background: '#11131e'
  on-background: '#e1e1f1'
  surface-variant: '#323440'
typography:
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  code-md:
    fontFamily: monospace
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 16px
  margin-safe: 32px
---

## Brand & Style

The design system is engineered to mirror the cognitive environment of a software engineer. It draws heavily from **Brutalist** and **Technical** design movements, prioritizing logic, hierarchy, and information density over decorative flair. The aesthetic is unashamedly digital, celebrating the structural elements of an Integrated Development Environment (IDE).

The target audience—recruiters, engineering managers, and fellow developers—should feel an immediate sense of familiarity. The UI evokes feelings of precision, transparency, and raw competence. By eschewing organic shapes and soft shadows in favor of hard edges and high-contrast borders, the design system communicates that the work contained within is structured, tested, and high-performance.

## Colors

The palette is rooted in a syntax-highlighting logic, utilizing a high-contrast dark mode as the foundation. 

- **Primary (Green):** Reserved for "success" states, primary actions, and terminal prompts.
- **Secondary (Purple):** Used for logic-heavy elements, keywords, and navigation headers.
- **Tertiary (Orange):** Applied to warnings, strings, and highlighted data points.
- **Neutral/Background:** A deep, non-pure black that reduces eye strain during long sessions, with a mid-tone grey for borders to define structural containment.

Color should be used functionally, not decoratively. Every accent color should ideally map to a specific type of information or status, similar to how an IDE differentiates variables from functions.

## Typography

Typography in this design system balances the geometric, technical feel of **Space Grotesk** for structural elements with the extreme legibility of **Inter** for long-form content. 

While the system fonts facilitate the UI, all technical data, logs, and code snippets must be rendered in a high-quality monospaced font (defaulting to system-level monospaced like JetBrains Mono or Fira Code where available). Headings use tight line-heights and slight negative letter-spacing to feel "packed" and intentional, while labels are often uppercased to mimic terminal headers or status bars.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model, strictly adhering to a 4px baseline rhythm. Elements are placed within a 12-column grid system that feels rigid and predictable. 

Spacing is used to create "blocks" of information rather than fluid, airy transitions. Gutters are kept narrow (16px) to maximize information density, reflecting the compact nature of developer tools. Padding within containers should be consistent—typically 16px or 24px—to maintain a uniform "boxed" look across all viewport sizes.

## Elevation & Depth

This design system rejects shadows entirely. Hierarchy and depth are instead conveyed through **Bold Borders** and **Tonal Layering**.

- **Surface 0 (Background):** The deepest layer, used for the main application canvas.
- **Surface 1 (Panels):** Elements that sit on the background use a 1px solid border.
- **Surface 2 (Active/Hover):** Interacting with an element does not lift it; instead, the border color changes or the background color shifts to a slightly lighter neutral.

To simulate overlap, use a "stacking" effect where the top element has a higher contrast border (e.g., the Primary Green) against a solid background, creating a clear visual break without the use of gradients or blurs.

## Shapes

The shape language is strictly **Sharp**. To maintain the "blocky" IDE aesthetic, all buttons, inputs, cards, and modal windows must have a 0px border-radius. 

This mathematical precision reinforces the technical nature of the system. The only exception to the "square" rule is the use of 45-degree chamfered corners for specific status tags or decorative "folder tab" elements, further emphasizing a mechanical, engineered feel.

## Components

### Buttons
Buttons are rectangular blocks with a 1px or 2px border. Primary buttons use a solid Green background with black text. Secondary buttons are transparent with a Purple border and text. On hover, buttons should "invert" (background becomes the border color) to provide immediate tactile feedback without needing elevation.

### Inputs & Text Areas
Input fields should resemble a terminal prompt, preceded by a `>` or `$` character. They feature a solid 1px border and use monospaced text. The cursor should be a solid, blinking block rather than a thin line.

### Cards & Containers
Cards are simple boxes with a visible border. Header areas of cards should be separated by a horizontal 1px line, mimicking the look of "tabs" or "panes" in a code editor.

### Chips & Status Indicators
Status indicators should look like Git badges or terminal tags. Use background colors (Green for `SUCCESS`, Orange for `PENDING`, Red for `FAILED`) with high-contrast text.

### Breadcrumbs & Navigation
Navigation should feel like a file directory path (e.g., `portfolio / projects / kubernetes-cluster`). Use the Secondary Purple for directory names and Primary Green for the current "file" or active page.