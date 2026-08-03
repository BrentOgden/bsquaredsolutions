import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { ROUTE_SEO } from "../data/seoData";

export default function NotFound() {
  return (
    <>
      <SEO {...ROUTE_SEO["/404"]} />
      <section className="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-[#04223f] to-[#023c72] px-6 py-24 text-center text-white">
        <div>
          <p className="text-lg font-semibold text-[#7fc4ff]">404</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
            Page not found
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            The page you requested does not exist or may have moved.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-[#0B3E73] transition hover:bg-white/90"
          >
            Return home
          </Link>
        </div>
      </section>
    </>
  );
}
