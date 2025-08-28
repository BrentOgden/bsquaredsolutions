// src/components/SEO.jsx
import React from "react";
import { Helmet } from "@dr.pogodin/react-helmet";

export default function SEO({
  title,
  description,
  image,          // absolute or site-relative
  path = "/",     // e.g. "/terms"
  schema = [],    // array of objects
  siteUrl = "https://bsquaredsolutions.io",
  twitter = "@bsquaredsolutions", // adjust as needed
}) {
  const url = siteUrl.replace(/\/$/, "") + path;

  // Build children as an array so we don't generate whitespace text nodes
  const children = [
    title ? <title key="title">{title}</title> : null,
    description ? <meta key="desc" name="description" content={description} /> : null,

    // Canonical
    <link key="canonical" rel="canonical" href={url} />,

    // Open Graph
    <meta key="og:type" property="og:type" content="website" />,
    <meta key="og:title" property="og:title" content={title || ""} />,
    description ? <meta key="og:desc" property="og:description" content={description} /> : null,
    <meta key="og:url" property="og:url" content={url} />,
    image ? <meta key="og:image" property="og:image" content={image} /> : null,

    // Twitter
    <meta key="tw:card" name="twitter:card" content="summary_large_image" />,
    twitter ? <meta key="tw:site" name="twitter:site" content={twitter} /> : null,
    title ? <meta key="tw:title" name="twitter:title" content={title} /> : null,
    description ? <meta key="tw:desc" name="twitter:description" content={description} /> : null,
    image ? <meta key="tw:image" name="twitter:image" content={image} /> : null,

    // JSON-LD (each object → its own <script>)
    ...(Array.isArray(schema)
      ? schema.map((obj, i) => (
          <script
            key={`ld-${i}`}
            type="application/ld+json"
            // IMPORTANT: use JSON.stringify; do NOT nest quotes around it
            dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
          />
        ))
      : []),
  ].filter(Boolean); // remove nulls

  return <Helmet>{children}</Helmet>;
}
