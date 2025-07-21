// src/components/FAQ.jsx
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const faqs = [
  {
    question: "How long does it take to build a custom website?",
    answer:
      "Typical turnaround for a standard 5–7 page site is 2-4 weeks, depending on complexity, feedback cycles, and content readiness. We’ll provide a detailed timeline in your proposal. Upon agreement to begin a project, an estimated timeline will be given and we will do our best to meet that timeline. If there are any delays we will notify you as soon as they arise.",
  },
  {
    question: "What technologies do you use for your custom sites?",
    answer:
      "We build primarily in React for dynamic UIs and can accomodate either single-page applications or multi-page sites. We use Tailwind CSS for efficiency and utility‑first styling, and can integrate with headless CMS platforms like Contentful or Sanity on request. For e‑commerce sites, we often choose to work with Shopify.",
  },
  {
    question: "Which CMS platforms are available if I choose a CMS site build?",
    answer:
      "Our specialty is WordPress, Shopify, AEM and Duda but we have experience working and building in many other CMS platforms and are happy to discuss other CMS options with you during your initial consultation. NOTE: With the CMS option, the cost of any custom plugins or themes (if you choose one that is prebuilt) that require montly subscription fees will be your responsibility.  ",
  },
  {
    question: "Do I need to purchase a domain or hosting before you build my site?",
    answer:
      "If you already have a domain that you prefer secured we will be happy to set up the DNS with whichever provider you would like (or point your new site to the existing service). If you have a domain in mind, but have not yet purchased it, we will secure that domain for you before the build process begins. NOTE: You are responsible for the yearly domain and hosting fees.",
  },
  {
    question: "Why are the domain and hosting fees not included in the initial cost?",
    answer:
      "We require you to handle the domain and hosting fees so that we can provide you a quality product without a monthly or yearly subscription. By keeping those costs and recurring charges with you, we provide the flexibility for you to handle your new site moving forward with no disruptions or hassle. Once your site is completed, YOU are in control. If we included those costs, we would have to charge a monthy or yearly subscription, and we prefer to give you the freedom to own your finished site on your terms. ",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes! We include 6 months of support with all of our custom build plans and 3 months with our CMS sites. After that, our maintenance plans start at $50/hr and include content updates, performance tuning, security patches, and feature enhancements.",
  },
  {
    question: "Can I purchase a maintenance plan even if you don't build my site?",
    answer:
      "Absolutely! We are experienced across several frameworks and CMS providers and are happy to provide support for existing sites. If you need content updates, a new plugin built, layout updates or anything else on an existing site our maintenance plan option is for you.",
  },
  {
    question: "How does payment work?",
    answer:
      "For a brand new site build (custom or CMS) we require a 50% deposit to get started and will collect the remaining 50% upon final delivery. For hourly projects (such as maintenance plans or general web administration), we bill a minimum of 2 hours. If the work takes less than the two hours, you will receive a refund for the extra time. We prefer to accept payment via Venmo so that we can provide services without having to charge a processing fee.",
  },
  {
    question: "Can you help with SEO and marketing?",
    answer:
      "Absolutely! Our website build packages include intitial custom SEO integration and Google Analytics. We also offer on‑page SEO audits, keyword research, Google Analytics/Tag Manager setup, and basic content strategy for existing sites to help your site rank and convert (for existing sites, you would select the maintenance plan option).",
  },
  {
    question: "Once the site is complete, do you charge a monthy fee for maintenance or monitoring?",
    answer:
      "All site builds include maintenance (content updates, asset updates, requested enhancements, etc.) for the specified period (3 months for CMS and 6 months for custom). Once that period has expired, you can choose the ad-hoc maintenance option when needed and we will make the updates. NOTE: For CMS hosted sites, you will receive a login to the dashboard so that you may make updates yourself. ",
  },
  {
    question: "What if I need a service that is not listed on your site?",
    answer:
      "We have years of experience across multiple technology channels and are happy to provide our services for any web project that you need. If you need a service that is not explicity mentioned on the site, send us an email or fill out the Contact Form and we will see if we can help. ",
  },
  {
    question: "After my maintenance period has expired, can I choose to make updates on my own? ",
    answer:
      "Absolutely! Unlike many of the other guys, we do not charge a monthly or yearly fee to manage or maintain your site. After the included maintenance period you are free to take full control of your site and do with it as you wish. Your site is YOUR site. No matter what you decide, we will always be here with our ad-hoc option should the need arise in the future. ",
  },
  {
    question: "Do you provide standalone design services, or am I required to have you build my site if you do the design? ",
    answer:
      "We are more than happy to work with you to design a site that meets your needs whether you want us to build the site or not. However, we feel like we are best qualified to bring that design to fruition and would love to do the entire project for you. If you want standalone design services only, send us an email or fill out the contact form and we will provide an initial consultation. ",
  },
  {
    question: "How do you determine the custom price to build my website?  ",
    answer:
      "The quote that we provide will be based on several factors including complexity of the site (how many pages, backend functionality, etc.), estimated time to complete the project, amount of assets/volume of copy and whether or not integrations are needed (i.e. Shopify). There is no specific hourly rate for these sites, but an estimate of the # of hours needed is factored into the quote. If the project takes significantly less time than quoted, we can work with you to adjust the final payment. ",
  },
  {
    question: "Why do you charge 50% of the fee upfront? Can't I just pay the entire amount when the site is completed? ",
    answer:
      "We charge 50% of the total cost as a deposit so that we can assure that we devote the time necessary to provide you with the best product possible. This deposit ensures that our time (and yours) is given the respect and priority that it deserves. Once the project is finished and you have reviewed and approved the final product, we will collect the final payment and give you access to the site. ",
  },
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="px-8 border-b border-[#0187e3]/40 last:border-none">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex justify-between items-center py-4 focus:outline-none"
      >
        <span className="text-lg font-semibold text-gray-800">{question}</span>
        {open ? (
          <IoIosArrowUp className="text-2xl text-accent" />
        ) : (
          <IoIosArrowDown className="text-2xl text-accent" />
        )}
      </button>
      {open && (
        <div className="pb-4 text-gray-700">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section
      id="faq"
      className="container mx-auto px-6 py-20 scroll-mt-20"
    >
      <h2 className="text-3xl mt-20 md:text-4xl font-bold text-primary text-center mb-12">
        Frequently Asked Questions
      </h2>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {faqs.map((faq) => (
          <FAQItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </section>
  );
}
