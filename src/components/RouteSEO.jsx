// src/components/RouteSEO.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import SEO from "./SEO";
import {
  ORGANIZATION_ID,
  ROUTE_SEO,
  SITE_URL,
  WEBSITE_ID,
} from "../data/seoData";

const HOME_TITLE = ROUTE_SEO["/"].title;
const HOME_DESCRIPTION = ROUTE_SEO["/"].description;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "B Squared Solutions",
  legalName: "B Squared Solutions, LLC",
  url: `${SITE_URL}/`,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/bsquaredlogo2.png`,
    contentUrl: `${SITE_URL}/bsquaredlogo2.png`,
  },
  image: `${SITE_URL}/og-default.png`,
  description: HOME_DESCRIPTION,
  email: "info@bsquaredsolutions.io",
  telephone: "+1-720-549-4203",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Denver",
    addressRegion: "CO",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "info@bsquaredsolutions.io",
    telephone: "+1-720-549-4203",
    areaServed: "US",
    availableLanguage: ["English"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: "B Squared Solutions",
  alternateName: "B Squared",
  description: HOME_DESCRIPTION,
  publisher: {
    "@id": ORGANIZATION_ID,
  },
  inLanguage: "en-US",
};

const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: `${SITE_URL}/`,
  name: HOME_TITLE,
  description: HOME_DESCRIPTION,
  isPartOf: {
    "@id": WEBSITE_ID,
  },
  about: {
    "@id": ORGANIZATION_ID,
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${SITE_URL}/og-default.png`,
  },
  inLanguage: "en-US",
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "B Squared Solutions Web Services",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Custom Web Development",
        description:
          "Responsive React, Tailwind CSS, CMS, and eCommerce website development.",
        url: `${SITE_URL}/products/#web-development`,
        areaServed: "US",
        provider: {
          "@id": ORGANIZATION_ID,
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "UX Design and Technical Consulting",
        description:
          "UX and UI design, architecture reviews, performance tuning, and implementation planning.",
        url: `${SITE_URL}/products/#design-consulting`,
        areaServed: "US",
        provider: {
          "@id": ORGANIZATION_ID,
        },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "SEO and Analytics",
        description:
          "Technical SEO, on-page optimization, structured data, and analytics configuration.",
        url: `${SITE_URL}/products/#seo-marketing`,
        areaServed: "US",
        provider: {
          "@id": ORGANIZATION_ID,
        },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Service",
        name: "Website Maintenance and Support",
        description:
          "Website updates, troubleshooting, performance improvements, and ongoing technical support.",
        url: `${SITE_URL}/products/#ongoing-support`,
        areaServed: "US",
        provider: {
          "@id": ORGANIZATION_ID,
        },
      },
    },
  ],
};

const ROUTE_META = {
  "/": {
    ...ROUTE_SEO["/"],
    schema: [
      organizationSchema,
      websiteSchema,
      homePageSchema,
      servicesSchema,
    ],
  },
  "/checkout": ROUTE_SEO["/checkout"],
  "/checkoutvenmo": ROUTE_SEO["/checkoutvenmo"],
  "/404": ROUTE_SEO["/404"],
};

export default function RouteSEO() {
  const { pathname } = useLocation();
  const meta = ROUTE_META[pathname];

  if (!meta) return null;

  return <SEO {...meta} />;
}
