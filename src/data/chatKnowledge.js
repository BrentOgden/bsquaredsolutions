export const BUSINESS_CONTACT = {
  phoneDisplay: "720-549-4203",
  phoneHref: "tel:+17205494203",
  email: "info@bsquaredsolutions.io",
  emailHref: "mailto:info@bsquaredsolutions.io",
};

export const CHAT_SUGGESTIONS = [
  "How much does a website cost?",
  "How long does a website take?",
  "Do you offer maintenance?",
  "What services do you offer?",
];

export const BUSINESS_KNOWLEDGE = `
B Squared Solutions is a Denver-based web design and development business serving small businesses.

CONTACT
- Phone: 720-549-4203
- Email: info@bsquaredsolutions.io
- Contact page: https://bsquaredsolutions.io/contact/

SERVICES
- Custom React and Tailwind website development
- CMS websites, including WordPress, Shopify, AEM, Duda, and other CMS platforms by consultation
- UX/UI design and technical consulting
- SEO, analytics, keyword research, structured data, and performance optimization
- Website maintenance, troubleshooting, content updates, and ongoing technical support
- Website templates

BUILD PACKAGE STARTING PRICES
- CMS Starter: $1,500
- Starter custom React site: $2,000
- Growth: $3,000
- Professional: starts at $6,000
Exact pricing depends on project scope. Direct visitors to https://bsquaredsolutions.io/packages/ for current package details or to the contact page for a custom quote.

TEMPLATES
- DIY Starter: $99 with one hour of support; template-only option listed on the packages page
- DIY Professional: $119 with one hour of support; template-only option listed on the packages page
- DIY Small Business: $149 with support; template-only option listed on the packages page
Direct visitors to https://bsquaredsolutions.io/templates/ or https://bsquaredsolutions.io/packages/ for current details.

MAINTENANCE
- On-Demand: $50/hour
- Ongoing Basic: $199/month
- Ongoing Premium: $399/month
Maintenance can be purchased even if B Squared Solutions did not build the website.

TIMELINE
A typical standard 5-7 page website takes approximately 2-4 weeks, depending on complexity, content readiness, and feedback cycles. A detailed estimate is provided with the proposal.

PAYMENT
New custom or CMS site builds generally require a 50% deposit to begin and the remaining 50% upon final delivery. Hourly work has a two-hour minimum. B Squared Solutions prefers Venmo to avoid processing fees.

DOMAINS AND HOSTING
Clients are responsible for recurring domain and hosting fees. B Squared Solutions can help secure a domain, configure DNS, and connect hosting.

SUPPORT
Support periods vary by package. Current package details should be confirmed on the packages page. After included support expires, clients can manage their own site or purchase maintenance.

SEO
Website packages include SEO fundamentals and analytics setup. Existing sites can receive SEO audits, keyword research, analytics/tag-manager configuration, content optimization, and technical SEO work.

ESCALATION
For custom quotes, contract questions, scheduling, billing/payment concerns, services not clearly described above, or anything uncertain, direct the visitor to 720-549-4203 or info@bsquaredsolutions.io. Never invent a price, guarantee, deadline, policy, discount, availability, or technical capability.
`;

const includesAny = (text, terms) => terms.some((term) => text.includes(term));

export function getFallbackAnswer(message = "") {
  const text = String(message).trim().toLowerCase();

  if (!text) {
    return "Ask me about website pricing, timelines, services, SEO, templates, or ongoing maintenance.";
  }

  if (includesAny(text, ["price", "pricing", "cost", "how much", "package", "quote"])) {
    return "Website packages currently start at $1,500 for a CMS Starter build, $2,000 for a custom React Starter build, $3,000 for Growth, and $6,000+ for Professional projects. Exact pricing depends on scope. You can review current packages at /packages/ or contact us for a custom quote.";
  }

  if (includesAny(text, ["how long", "timeline", "timeframe", "weeks", "take to build"])) {
    return "A typical 5-7 page website takes about 2-4 weeks, depending on complexity, content readiness, and feedback cycles. A project-specific timeline is provided with the proposal.";
  }

  if (includesAny(text, ["maintenance", "support", "update my site", "updates", "existing site"])) {
    return "Yes. B Squared Solutions supports both new and existing websites. On-demand maintenance is $50/hour, with ongoing plans currently available at $199/month and $399/month. See /packages/#maintenance for details.";
  }

  if (includesAny(text, ["seo", "google", "analytics", "rank", "ranking", "search engine"])) {
    return "Yes. B Squared Solutions provides technical and on-page SEO, keyword research, structured data, analytics setup, performance optimization, and SEO audits for existing sites.";
  }

  if (includesAny(text, ["wordpress", "shopify", "cms", "aem", "duda", "react", "tailwind", "technology", "tech stack"])) {
    return "B Squared Solutions builds custom React/Tailwind sites and works with CMS platforms including WordPress, Shopify, AEM, Duda, and others by consultation.";
  }

  if (includesAny(text, ["template", "diy"])) {
    return "Yes. B Squared Solutions offers DIY website templates, including Starter, Professional, and Small Business options. Current pricing and previews are available at /templates/ and /packages/.";
  }

  if (includesAny(text, ["domain", "hosting", "dns"])) {
    return "B Squared Solutions can help secure a domain, configure DNS, and connect hosting. Recurring domain and hosting fees remain the client's responsibility.";
  }

  if (includesAny(text, ["payment", "deposit", "venmo", "pay"])) {
    return "New website builds generally require a 50% deposit to begin and the remaining 50% at final delivery. Hourly work has a two-hour minimum, and Venmo is the preferred payment method.";
  }

  if (includesAny(text, ["phone", "call", "email", "contact", "talk", "person", "human"])) {
    return "You can call B Squared Solutions at 720-549-4203 or email info@bsquaredsolutions.io. You can also use the contact form at /contact/.";
  }

  if (includesAny(text, ["service", "what do you do", "what can you", "offer"])) {
    return "B Squared Solutions offers custom web development, CMS builds, UX/UI design and consulting, SEO and analytics, website maintenance, technical support, and website templates.";
  }

  return "I can help with B Squared Solutions services, packages, timelines, SEO, templates, and maintenance. For a custom question or quote, call 720-549-4203 or email info@bsquaredsolutions.io.";
}
