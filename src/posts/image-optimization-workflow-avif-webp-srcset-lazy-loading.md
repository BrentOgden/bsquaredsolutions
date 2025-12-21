---
title: "Image Optimization Workflow: AVIF, WebP, srcset, and Lazy Loading"
slug: "image-optimization-workflow-avif-webp-srcset-lazy-loading"
description: "A practical image optimization workflow using AVIF, WebP, srcset, and lazy loading to improve performance and Core Web Vitals."
date: "December 7, 2025"
hero: https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg
heroAlt: "Designer optimizing images for the web"
heroPosition: "center"
---

Images are usually the **largest performance bottleneck** on small business websites. Optimizing them correctly can dramatically improve load times, SEO, and conversions—without hurting visual quality.

Here’s a modern, practical workflow that works across CMSs and frameworks.

---

## Step 1: Use Modern Image Formats

### Best options today:
- **AVIF** – smallest file sizes, best compression
- **WebP** – excellent fallback support
- **JPEG / PNG** – legacy formats only when required

**Rule of thumb:**  
AVIF first, WebP second, JPEG last.

---

## Step 2: Resize Images Before Uploading

Never upload:
- Camera originals
- 4000–6000px wide images
- Uncropped screenshots

### Common max widths:
- Hero images: **1920px**
- Content images: **1200px**
- Thumbnails: **400–600px**

Oversized images waste bandwidth even when compressed.

---

## Step 3: Use `srcset` for Responsive Images

`srcset` lets browsers choose the right image size for the device.

### Benefits:
- Faster mobile load times
- Smaller downloads
- Better Core Web Vitals scores

Most modern CMSs generate `srcset` automatically—but only if you upload properly sized images.

---

## Step 4: Enable Lazy Loading

Lazy loading delays offscreen images until they’re needed.

### Why it matters:
- Faster initial page load
- Reduced bandwidth usage
- Improved Largest Contentful Paint (LCP)

Modern browsers support this natively:
```html
loading="lazy"
