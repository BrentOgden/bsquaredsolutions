// src/components/SEO.jsx
import { Helmet } from "@dr.pogodin/react-helmet";

const SITE = "https://bsquaredsolutions.io";
const DEFAULT = {
  title: "B Squared Solutions | React & Tailwind Web Development",
  description:
    "Custom React & Tailwind websites, performance, SEO, and ongoing support for Colorado small businesses.",
  image: `${SITE}/og-default.svg`,
  twitter: "@yourhandle"
};

export default function SEO({
  title = DEFAULT.title,
  description = DEFAULT.description,
  path = "/",
  image = DEFAULT.image,
  type = "website",
  twitter = DEFAULT.twitter,
  publishedTime,
  modifiedTime,
  schema
}) {
  const url = `${SITE}${path}`;
  const robots = "index, follow, max-image-preview:large";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitter && <meta name="twitter:site" content={twitter} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured data */}
      {Array.isArray(schema)
        ? schema.map((s, i) => (
            <script key={i} type="application/ld+json">
              {JSON.stringify(s)}
            </script>
          ))
        : schema && (
            <script type="application/ld+json">
              {JSON.stringify(schema)}
            </script>
          )}
    </Helmet>
  );
}
