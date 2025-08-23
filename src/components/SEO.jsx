// src/components/SEO.jsx
import React from "react";
import { Helmet } from "@dr.pogodin/react-helmet";

const DEFAULT_BASE_URL = "https://bsquaredsolutions.io";

/** Normalize any input to an array */
const toArray = (x) => (Array.isArray(x) ? x : x ? [x] : []);

/** Remove per-node @context so we can emit a single, valid top-level @context */
const stripContext = (node) => {
  if (!node || typeof node !== "object") return node;
  const { ["@context"]: _ignored, ...rest } = node;
  return rest;
};

/** Build a single JSON-LD payload with @graph (preferred for multiple nodes) */
const buildJsonLd = (schema) => {
  const nodes = toArray(schema).filter(Boolean).map(stripContext);
  if (nodes.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
};

export default function SEO({
  title,
  description,
  path = "/",
  type = "website",
  image,
  schema,            // object or array of objects
  noindex = false,
  baseUrl = DEFAULT_BASE_URL,
}) {
  const base = baseUrl?.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const cleanPath = path?.startsWith("/") ? path : `/${path || ""}`;
  const canonical = `${base}${cleanPath}`;

  const jsonLd = buildJsonLd(schema);

  return (
    <Helmet>
      {/* Title & Description */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* JSON-LD (must be serialized string) */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
