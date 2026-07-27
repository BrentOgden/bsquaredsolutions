// src/components/SEO.jsx
import React from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "../data/seoData";

function toAbsoluteUrl(value, siteUrl) {
  if (!value) return undefined;

  try {
    return new URL(value, `${siteUrl.replace(/\/$/, "")}/`).toString();
  } catch {
    return value;
  }
}

export default function SEO({
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  path = "/",
  canonical,
  schema = [],
  type = "website",
  siteUrl = SITE_URL,
  siteName = SITE_NAME,
  locale = "en_US",
  twitter,
  noindex = false,
  nofollow = false,
  robots,
  publishedTime,
  modifiedTime,
  author,
}) {
  const normalizedSiteUrl = siteUrl.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const pageUrl = toAbsoluteUrl(
    canonical || `${normalizedSiteUrl}${normalizedPath}`,
    normalizedSiteUrl
  );
  const imageUrl = toAbsoluteUrl(image, normalizedSiteUrl);
  const resolvedImageAlt = imageAlt || title;
  const robotsContent =
    robots ||
    `${noindex ? "noindex" : "index"}, ${nofollow ? "nofollow" : "follow"}`;
  const schemaItems = Array.isArray(schema) ? schema : schema ? [schema] : [];
  const usesDefaultImage = imageUrl === DEFAULT_OG_IMAGE;

  const children = [
    title ? <title key="title">{title}</title> : null,
    description ? (
      <meta key="description" name="description" content={description} />
    ) : null,
    <meta key="robots" name="robots" content={robotsContent} />,
    <meta key="googlebot" name="googlebot" content={robotsContent} />,
    pageUrl ? <link key="canonical" rel="canonical" href={pageUrl} /> : null,

    <meta key="og:type" property="og:type" content={type} />,
    <meta key="og:site_name" property="og:site_name" content={siteName} />,
    <meta key="og:locale" property="og:locale" content={locale} />,
    title ? <meta key="og:title" property="og:title" content={title} /> : null,
    description ? (
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
    ) : null,
    pageUrl ? <meta key="og:url" property="og:url" content={pageUrl} /> : null,
    imageUrl ? <meta key="og:image" property="og:image" content={imageUrl} /> : null,
    imageUrl ? (
      <meta key="og:image:secure_url" property="og:image:secure_url" content={imageUrl} />
    ) : null,
    resolvedImageAlt ? (
      <meta key="og:image:alt" property="og:image:alt" content={resolvedImageAlt} />
    ) : null,
    usesDefaultImage ? (
      <meta key="og:image:width" property="og:image:width" content="1200" />
    ) : null,
    usesDefaultImage ? (
      <meta key="og:image:height" property="og:image:height" content="630" />
    ) : null,
    usesDefaultImage ? (
      <meta key="og:image:type" property="og:image:type" content="image/png" />
    ) : null,

    <meta key="twitter:card" name="twitter:card" content="summary_large_image" />,
    twitter ? <meta key="twitter:site" name="twitter:site" content={twitter} /> : null,
    title ? <meta key="twitter:title" name="twitter:title" content={title} /> : null,
    description ? (
      <meta
        key="twitter:description"
        name="twitter:description"
        content={description}
      />
    ) : null,
    imageUrl ? (
      <meta key="twitter:image" name="twitter:image" content={imageUrl} />
    ) : null,
    resolvedImageAlt ? (
      <meta
        key="twitter:image:alt"
        name="twitter:image:alt"
        content={resolvedImageAlt}
      />
    ) : null,

    type === "article" && publishedTime ? (
      <meta
        key="article:published_time"
        property="article:published_time"
        content={publishedTime}
      />
    ) : null,
    type === "article" && modifiedTime ? (
      <meta
        key="article:modified_time"
        property="article:modified_time"
        content={modifiedTime}
      />
    ) : null,
    type === "article" && author ? (
      <meta key="article:author" property="article:author" content={author} />
    ) : null,

    ...schemaItems.map((obj, index) => (
      <script
        key={`ld-${index}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(obj).replace(/</g, "\\u003c"),
        }}
      />
    )),
  ].filter(Boolean);

  return <Helmet>{children}</Helmet>;
}
