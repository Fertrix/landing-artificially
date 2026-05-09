---
name: Artificially
colors:
  surface: '#141313'
  surface-dim: '#141313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353434'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c8c6c5'
  on-secondary: '#303030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#ffffff'
  on-tertiary: '#2f3131'
  tertiary-container: '#e2e2e2'
  on-tertiary-container: '#636565'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1b1b1c'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#141313'
  on-background: '#e5e2e1'
  surface-variant: '#353434'
typography:
  h1:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  h1-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  h2:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  accent-italic:
    fontFamily: Instrument Serif
    fontSize: 1.1em
    fontWeight: '400'
    lineHeight: '1'
  label:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 4rem
  gutter: 24px
  margin: 32px
  max-width: 1440px
---

## Brand & Style

This design system is built on the principle of **Architectural Minimalism**. It treats the interface as a structured, high-stakes environment for autonomous operations. The aesthetic is unapologetically high-contrast, utilizing a pure black foundation to allow data and critical insights to "emerge" from the void.

The brand personality is authoritative, precise, and sophisticated. It avoids decorative clutter in favor of spatial intent and typographic excellence. The visual language balances the industrial rigidity of sans-serif layouts with the intellectual, editorial flair of serif italic accents, signaling a fusion of machine speed and human oversight. The "Liquid Glass" effect provides the only sense of depth, acting as a functional layer for ephemeral UI elements like modals and hover states.

## Colors

The palette is strictly monochromatic, anchored by a "True Black" (#000) background. This creates an infinite canvas where light is used as a tool rather than a decoration. 

- **Primary & Foreground:** Pure white is reserved for high-priority text, primary actions, and structural lines.
- **Surface Strategy:** Cards and containers use a 5% grey to provide subtle separation from the background without breaking the dark immersion.
- **Accents:** A muted, desaturated teal-grey (HSL 170 15% 45%) is used sparingly for successful states, active focus indicators, or professional highlights that require distinction from the grayscale scale.
- **Muted Elements:** Lower-tier information uses shifted opacities of white to ensure legibility while maintaining a clear information hierarchy.

## Typography

Typography in this design system is used as a structural element. **Inter** provides the utilitarian foundation required for data-heavy RevOps interfaces, emphasizing clarity and vertical rhythm.

**The Italic Accent:** To break the mechanical rigidity of the sans-serif layout, **Instrument Serif** is used exclusively in italics for specific emphasized words, quotes, or human-centric descriptions. This creates an editorial feel, suggesting a premium, "curated" autonomous experience.

**Hierarchy Rules:**
1. Headlines should use tight letter-spacing and heavy weights.
2. Labels must be uppercase with tracking increased to 5% for technical legibility.
3. Use serif italics sparingly (no more than 3 words in a sequence) to highlight key value propositions or AI insights.

## Layout & Spacing

This design system employs a **Fixed Grid** philosophy to reinforce its architectural style. On desktop, a 12-column grid provides the framework for all modules, while mobile scales to a 4-column layout.

**Spacing Rhythm:**
- A 4px baseline grid governs all internal padding and alignment.
- Content is strictly aligned to the grid; "optical" centered alignment is discouraged in favor of hard edge alignment.
- Large, intentional gaps (xl spacing) are used to separate major sections, preventing the high-contrast elements from feeling cluttered.
- Gutters are kept wide (24px) to ensure that even with pure black backgrounds, the "air" between data points is palpable.

## Elevation & Depth

Elevation is achieved through tonal variance and the **Liquid Glass** effect rather than traditional shadows.

1. **Base Layer:** Pure Black (#000). Everything "lives" here.
2. **Container Layer:** Card surfaces (#0D0D0D) use subtle borders (#333) to define shape.
3. **Liquid Glass Effect:** Used for floating elements (modals, dropdowns, tooltips). This effect consists of:
    - Background: White at 5-8% opacity.
    - Backdrop-blur: 12px to 20px.
    - Border: A 1px linear gradient (Top-left: White 20%, Bottom-right: Transparent).
4. **Interaction Layer:** No shadows are used. Depth is indicated by an element's border increasing in brightness or a transition from a #0D0D0D surface to a #1A1A1A surface.

## Shapes

The shape language is **Soft-Geometric**. While the overall layout feels "sharp" and architectural, UI components utilize a 0.25rem (4px) corner radius to ensure the interface remains accessible and modern.

- **Primary Containers:** 4px radius.
- **Buttons & Inputs:** 4px radius to maintain a consistent silhouette.
- **Liquid Glass Overlays:** May utilize larger radii (8px or 12px) to differentiate floating "software" layers from the structural "system" layers.
- **Strict Rule:** Never use fully rounded (pill) shapes; every element must retain its rectangular intent to fit the architectural narrative.

## Components

### Buttons
- **Primary:** Pure white background with pure black text. No border. Sharp 4px corners.
- **Secondary:** Transparent background with a 1px white border. 
- **Ghost:** No background or border. Text only, using `muted-foreground`. On hover, transitions to `foreground` white.

### Cards & Modules
All cards utilize the `--card` background. Critical autonomous insights should be wrapped in the **Liquid Glass** effect to highlight their priority. Borders are always 1px and use the `--border` token.

### Input Fields
Inputs are defined by a bottom-border or a full ghost-border. They use the `--input` color for the background. The focus state is a sharp 1px white outline with no glow/shadow, emphasizing the architectural precision.

### Lists & Data
Data rows are separated by 1px horizontal lines (#222). Hovering over a row should change the background to `--secondary` (#1F1F1F).

### Technical Accents
Small status dots or "active" indicators use the `--accent` color. These are the only non-monochrome elements in the system, acting as "precision lights" in a dark cockpit.