# Cargo+ Template — Design System Spec
*Extracted from html.to.design CSS export, homepage*

## Colors

| Name | Hex / Value | Used for |
|---|---|---|
| Gallery | `#EDEDED` | Light backgrounds, white text-on-dark |
| Cod Gray | `#151515` | Dark backgrounds, dark text-on-light |
| Mine Shaft | `#272727` | Input fields, dark tag chips |
| Alto | `#D9D9D9` | Testimonial section background |
| White | `#FFFFFF` | Hero text |
| Black | `#000000` | Icon strokes |
| Gallery 64% | `rgba(237,237,237,0.64)` | Muted body text on dark |
| Gallery 48% | `rgba(237,237,237,0.48)` | Faint text/borders on dark |
| Gallery 8% | `rgba(237,237,237,0.08)` | Subtle button/chip fill on dark |
| Cod Gray 48% | `rgba(21,21,21,0.48)` | Image overlays |
| Cod Gray 16% | `rgba(21,21,21,0.16)` | Divider lines |
| Cod Gray 8% | `rgba(21,21,21,0.08)` | Subtle button fill on light |

**Pattern:** every section alternates dark (`#151515`) / light (`#EDEDED`) / mid-gray (`#D9D9D9`) full-bleed backgrounds. Text color flips accordingly (white-on-dark, dark-on-light).

## Fonts

| Role | Font (real name — Figma showed Arial as fallback) | Weight | Notes |
|---|---|---|---|
| Display / Headlines | **Overused Grotesk Light** | 400 (Light) | Huge sizes, very tight tracking |
| Buttons / Tags / Labels | **IBM Plex Mono** | 400 Regular | Always uppercase |
| Body text | Overused Grotesk (or system fallback — same family as headlines, just smaller) | 400 | |

> Note: the export mapped both to Arial since the real fonts aren't installed — but the actual template uses **Overused Grotesk** (display) and **IBM Plex Mono** (UI/labels). Look these up for licensing/purchase or free alternatives when you rebuild.

## Type Scale

| Style | Size | Line-height | Letter-spacing | Case |
|---|---|---|---|---|
| Hero H1 | ~98–101px | 94px | -3.264px | Normal |
| Marquee H0 | ~162px | 137px | -4.8px | Normal |
| Section headline (H2) | ~49–50px | 55px | -1.536px | Normal |
| Stat number (H3) | ~45px | 55px | -1.536px | Normal |
| FAQ question (H4) | ~37–38px | 43px | -0.576px | Normal |
| Body | 16–17px | 26px | 0.269px | Normal |
| Small label (mono) | 12.9px | 17px | 0.806px | UPPERCASE |
| Button text (mono) | 15px | 21px | 1.075px | UPPERCASE |

**Pattern:** display headings get increasingly *negative* letter-spacing as size grows (tight, condensed feel). Mono/label text always gets *positive* letter-spacing + uppercase (spaced-out, technical feel). This contrast is a key part of the brand's visual identity.

## Spacing System

Base unit ≈ **8.45px**. Nearly everything is a multiple of it:

| Multiplier | Value | Used for |
|---|---|---|
| 1x | 8.45px | Icon gaps, tight padding |
| 2x | 17.09px | Button padding (vertical side) |
| 3x | 25.54px | Card internal gaps |
| 4x | 34.17px | Page horizontal padding, card padding |
| 6x | 51.25px | Footer column gaps |
| 10x | 85.25px | Medium section padding |
| 15x | 128.06px | **Standard section vertical padding (top/bottom)** |
| 20x | 170.7px | Large section padding (FAQ section top) |

## Border Radius

| Value | Used for |
|---|---|
| 8.45px | Buttons, chips, small cards |
| 12.86px | Large image cards, video containers |
| 1920px | Fully round (pill buttons, circular icons) |

## Buttons

**Primary CTA** (`a.cta_main`):
- Padding: `12.864px 17.088px`
- Background: `#EDEDED` (light) or `rgba(21,21,21,0.08)` (subtle dark variant)
- Border-radius: `8.45px`
- Text: IBM Plex Mono, 15px, uppercase, 1.075px tracking

**Small CTA** (`a.cta_small`):
- Padding: `8.448px 12.864px`
- Text: IBM Plex Mono, 12.9px, uppercase

**Nav link chip**:
- Padding: `8.448px 12.864px`
- Background: `rgba(237,237,237,0.08)` + `backdrop-filter: blur(4px)`
- Border-radius: `8.45px`

## Cards

**Testimonial stat tile**: padding-left `25.536px`, gap `17.08px` between number and label
**News card**: padding `25.53px`, border-radius `8.45px`, dark overlay `rgba(21,21,21,0.48)` on background image
**About/service card**: padding `34.176px`, gradient overlay `linear-gradient(0deg, rgba(21,21,21,0.64) 0%, rgba(21,21,21,0) 100%)` bottom-to-top for text legibility over images

## Layout Notes

- Full page width: 1920px design canvas (desktop)
- Section pattern: full-bleed background color, content constrained/centered, generous 128px vertical rhythm between sections
- Heavy use of `backdrop-filter: blur()` on translucent UI elements (nav, buttons, tags) — glassmorphism-lite effect
- Marquee/logo strips use infinite horizontal scroll (not captured in static CSS — recreate with CSS animation or JS)
- GSAP split-line text reveals used throughout (headlines split into lines, animated in) — not captured in static CSS, this is a JS animation layer to rebuild separately

## What's NOT in this doc (need separate capture)
- Scroll-triggered animations (GSAP split-text reveals, fade-ins)
- Marquee infinite-scroll behavior
- Carousel/slider interaction (testimonials, news, about cards)
- Video background behavior and play/pause button interaction
- Hover states on buttons/cards
