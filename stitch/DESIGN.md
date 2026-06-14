# Design System Strategy: The Mediterranean Executive

## 1. Overview & Creative North Star
**Creative North Star: "The Architectural Concierge"**

This design system transcends the "commodity" car rental aesthetic. It is built to feel like an elite Tunisian architectural firm—structured, airy, and inherently premium. We move away from the "template" look by rejecting the rigid grid in favor of **Intentional Asymmetry** and **Editorial Breathing Room**. 

The brand’s "Trust" isn't built through heavy borders and loud banners, but through the authority of high-contrast typography and sophisticated tonal layering. We treat the digital interface as a curated physical space where white space is not "empty," but a luxury material in itself.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
To achieve a signature executive feel, we use a sophisticated palette that prioritizes depth over decoration.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or card definition. Boundaries must be defined solely through:
1.  **Background Color Shifts:** A `surface-container-low` section sitting on a `surface` background.
2.  **Tonal Transitions:** Using `surface-container-highest` to subtly lift a sub-section.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked sheets of fine Tunisian linen and frosted glass.
*   **Base Layer:** `surface` (#f7f9fc) provides a crisp, professional canvas.
*   **Sectioning:** Use `surface-container-low` (#f2f4f7) for secondary sections like "Our Fleet" or "Testimonials."
*   **Elevated Components:** Use `surface-container-lowest` (#ffffff) for primary cards to create a "pop" against the gray sections.

### The "Glass & Gradient" Rule
To prevent the brand from feeling static:
*   **Signature Textures:** For main CTAs and Hero headers, use a subtle linear gradient from `primary` (#00256f) to `primary-container` (#1a3c8f). This creates a "soul" within the blue that flat hex codes cannot mimic.
*   **Floating Navigation:** The header should utilize a backdrop-blur (20px) with 85% opacity of `primary_container` to feel integrated with the content scrolling beneath it.

---

## 3. Typography: Editorial Authority
We utilize a dual-typeface system to balance heritage with modernity.

*   **Display & Headlines (Manrope):** This is our "Editorial Voice." We use Manrope for all headers to provide a geometric, high-end feel that feels more "bespoke" than standard sans-serifs.
    *   *Headline-lg (2rem)*: Use for car model names and section titles.
    *   *Display-sm (2.25rem)*: Use for high-impact value propositions.
*   **Body & UI (Plus Jakarta Sans):** Chosen for its exceptional legibility and modern "tech-forward" feel.
    *   *Body-lg (1rem)*: Used for descriptions and lead-ins.
    *   *Label-md (0.75rem)*: Used for technical specs (e.g., fuel type, transmission) in all-caps with 0.05em letter spacing.

---

## 4. Elevation & Depth: The Layering Principle
We reject the standard "shadow-on-white" look for a more natural, ambient approach.

*   **Tonal Layering:** Depth is achieved by "stacking." A `surface-container-lowest` card placed on a `surface-container-low` section creates a soft, natural lift without a single pixel of shadow.
*   **Ambient Shadows:** If a floating element (like a Booking Widget) requires a shadow, it must be ultra-diffused: 
    *   *Shadow:* `0 20px 40px rgba(25, 28, 30, 0.06)`. Note the low opacity and large blur.
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use `outline-variant` (#c4c6d3) at **15% opacity**. Never 100%.

---

## 5. Components

### Buttons: The Kinetic Anchor
*   **Primary:** A bold, high-contrast block using the `primary` to `primary-container` gradient. 
    *   *Corner Radius:* `lg` (0.5rem) for a balanced professional feel.
    *   *Interaction:* On hover, the gradient shifts intensity; on click, a subtle 2px scale down.
*   **Secondary:** `outline` token at 20% opacity with `on_primary_fixed_variant` text. No solid background.

### Cards: The Fleet Display
*   **Rule:** Forbid all divider lines.
*   **Style:** `surface-container-lowest` background. Use `body-sm` in `on_surface_variant` for specs, grouped by generous vertical whitespace rather than lines.
*   **Imagery:** Car images should bleed to the edges or sit on a `surface_variant` rounded background within the card.

### Input Fields: The Booking Interface
*   **Style:** Minimalist. No four-sided boxes. Use a `surface-container-highest` bottom-border (2px) that transforms into a `primary` color on focus.
*   **Labeling:** `label-md` in `on_surface_variant` positioned above the input, never placeholder-only.

### Specialized Component: The "Search Float"
For a car rental brand, the search/booking bar is the most critical element. It should be a "Floating Glass" component: `surface-container-lowest` with a 90% opacity and a `20px` backdrop-blur, sitting across the transition of the Hero and the first section.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetric Padding:** Allow text content to breathe. Use `64px` to `128px` vertical spacing between major sections.
*   **Respect the Tonal Shift:** Always ensure that an "elevated" element is lighter than the surface it sits on.
*   **Use High-Quality Imagery:** Only use photography with natural lighting and professional environments to match the "Executive" tone.

### Don’t:
*   **Don't Use Dividers:** Never use a horizontal line to separate two pieces of content. Use the Spacing Scale (Title-to-Body: 16px; Group-to-Group: 40px).
*   **Don't Use Pure Black:** Use `on_surface` (#191c1e) for text. Pure black is too harsh for the Mediterranean light we are mimicking.
*   **Don't Round Everything:** Avoid the "full" roundedness for main buttons; keep it to `lg` (0.5rem) to maintain a sense of architectural structure.