import React from "react";
import { useLocation } from "react-router-dom";
import SEO from "./SEO";

const META = {
  "/": {
    title: "B Squared Solutions | Custom Websites, Templates & Maintenance",
    description:
      "Denver-based web studio building fast, SEO-friendly React & CMS sites. Custom builds, ready-made templates, and ongoing maintenance to keep you speedy and secure.",
    type: "website",
    image: "https://bsquaredsolutions.io/bsquaredlogo2.png",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://bsquaredsolutions.io/#website",
        url: "https://bsquaredsolutions.io/",
        name: "B Squared Solutions",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://bsquaredsolutions.io/blog?query={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://bsquaredsolutions.io/#organization",
        name: "B Squared Solutions",
        url: "https://bsquaredsolutions.io/",
        logo: "https://bsquaredsolutions.io/bsquaredlogo2.png",
        sameAs: ["https://www.linkedin.com/company/b-squared-solutions"],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+1-720-254-5354",
            contactType: "customer service",
            areaServed: "US",
          },
        ],
      },
    ],
  },

  // Real pages only below — give each a unique title/description
  "/contact": {
    title: "Contact B Squared Solutions",
    description:
      "Have a project or question? Reach out to B Squared Solutions.",
  },
  "/portfolio": {
    title: "Portfolio | B Squared Solutions",
    description:
      "Recent websites, templates, and custom builds delivered by B Squared Solutions.",
  },
  "/packages": {
    title: "Website Packages | B Squared Solutions",
    description:
      "Choose the website package that fits your business—Starter, Growth, or Custom.",
  },
  "/templates": {
    title: "Website Templates | B Squared Solutions",
    description:
      "Ready-made website templates you can launch fast and customize to your brand.",
  },
  "/faq": {
    title: "FAQ | B Squared Solutions",
    description:
      "Answers to common questions about websites, templates, and maintenance.",
  },
  "/blog": {
    title: "Blog | B Squared Solutions",
    description:
      "Tips on web design, SEO, performance, and maintenance for small businesses.",
  },
  "/terms": { title: "Terms of Service | B Squared Solutions", description: "" },
  "/privacy": { title: "Privacy Policy | B Squared Solutions", description: "" },
};

export default function RouteSEO() {
  const { pathname } = useLocation();

  // Let individual posts handle their own SEO
  if (pathname.startsWith("/blog/")) return null;

  const meta = META[pathname] || META["/"];
  return <SEO {...meta} path={pathname} />;
}
