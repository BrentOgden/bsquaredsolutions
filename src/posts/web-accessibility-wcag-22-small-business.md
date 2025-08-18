---
title: "Small Business Web Accessibility: WCAG 2.2 Checklist & ADA Compliance Basics"
description: "A practical, plain-English guide to making your small business website accessible—WCAG 2.2 essentials, ADA considerations, quick wins, and tools."
date: "May 24, 2025"
hero: "https://images.pexels.com/photos/6980183/pexels-photo-6980183.jpeg"
heroSource: "https://www.pexels.com/photo/serious-disabled-woman-working-on-laptop-6980183/"
heroAlt: "Person working on a laptop with accessibility needs"
heroPosition: "50% 40%"
slug: "web-accessibility-wcag-22-small-business"
---


If your site is hard to use with a keyboard, has low color contrast, or lacks alt text, you’re silently turning away customers—and risking demand letters over ADA compliance. The good news: most accessibility fixes are straightforward and improve **SEO**, **conversion rate**, and **user experience** for everyone.

## What “accessible website” means (in 30 seconds)

Accessibility follows the **POUR** principles: *Perceivable, Operable, Understandable, Robust*. The widely used standard is **WCAG** (Web Content Accessibility Guidelines). Aim for **WCAG 2.2 Level AA** as a practical baseline for small businesses. (See the official guidelines for details.) :contentReference[oaicite:0]{index=0}

---

## Quick WCAG 2.2 AA checklist (copy/paste)

### Content & media
- [ ] Every meaningful image has descriptive 'alt' text (decorative images use empty alt 'alt=""').
- [ ] Videos include **captions**; important audio has **transcripts**.
- [ ] Don’t convey meaning by color alone (add labels/icons).

### Color & contrast
- [ ] Body text vs. background is **≥ 4.5:1** contrast (≥ 3:1 for large text).
- [ ] Focus outlines are clearly visible and meet contrast requirements.

### Structure & navigation
- [ ] Headings are nested ('h1' → 'h2' → 'h3') and used for structure—not styling.
- [ ] Landmarks present (e.g., 'header', 'nav', 'main', 'footer') for screen reader navigation.
- [ ] Skip link provided to jump to main content.

### Keyboard & focus
- [ ] All interactive elements (menus, forms, modals, sliders) are **keyboard-operable**.
- [ ] Focus order is logical; no “keyboard traps.”
- [ ] Visible focus styles (no outline: none; provide custom focus ring).

### Forms
- [ ] Each input has an explicit '<label>' (or 'aria-label') and helpful error messages.
- [ ] Required fields indicated non-color (e.g., text/asterisk) and programmatically.

### Components & feedback
- [ ] Modals/menus trap focus while open and restore focus on close.
- [ ] Status messages (e.g., “Added to cart”) announced via ARIA live regions when needed.

### Mobile & target sizes
- [ ] Touch targets are comfortably sized (≈44×44 px) with adequate spacing.
- [ ] Layout reflows at 200% zoom without losing content or functionality.

---

## Fast wins most sites can ship this week

1. **Fix color contrast** (buttons, links, body text).  
2. **Add alt text** to hero images, product photos, icons conveying meaning.  
3. **Make the keyboard pass**: Tab through your site; fix anything unreachable.  
4. **Label every input** (and show clear error states).  
5. **Give focus a glow-up**: use a high-contrast outline for links/buttons.

---

## Tools we actually use

- **Lighthouse** (Chrome): basic a11y audit in DevTools.  
- **axe DevTools** (browser extension): actionable WCAG findings.  
- **WAVE**: quick visual checks of headings/alt/contrast.  
- **Color Contrast Checker** (WebAIM): verify ratios.

> Tip: treat accessibility like performance—add it to your **Definition of Done** so regressions don’t creep back in.

---

## Platform tips (WordPress, Webflow, React)

- **WordPress**: choose an accessibility-ready theme; use semantic blocks; test plugins for keyboard traps.  
- **Webflow**: define heading hierarchy, alt text, and focus states; label form fields; use aria-labels for icons.  
- **React**: prefer semantic HTML ('<button>', '<nav>', '<label>'); manage focus on route changes and in modals; avoid div-only components for interactive UI.

---

## FAQ

**Is ADA compliance legally required?**  
There’s no single federal “ADA website law,” but courts regularly interpret the ADA to apply to business websites. Following **WCAG 2.2 AA** materially reduces risk while improving UX. :contentReference[oaicite:1]{index=1}

**What if my budget is limited?**  
Start with color contrast, keyboard access, and labels/captions. These deliver the biggest impact for the least effort.

---

## Need help?

We can run a quick audit, prioritize fixes, and ship improvements that help everyone—*and* your bottom line.
