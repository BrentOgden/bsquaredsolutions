// src/components/About.jsx
import React from "react";
import aboutHero from "../assets/aboutHero.png";
import { BiCommentDetail, BiSupport } from "react-icons/bi";
import { RiFocus3Line } from "react-icons/ri";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { Parallax } from "react-parallax";

const features = [
  {
    icon: FaWandMagicSparkles,
    title: "Modern Look and Feel",
    desc:
      "Elevate your online presence with cutting‑edge design and pristine code—tailored to showcase your brand’s vision and captivate visitors from the very first click."
  },
  {
    icon: RiFocus3Line,
    title: "Attention to Detail",
    desc:
      "We obsess over every pixel and interaction—ensuring your site not only wows visually but delivers flawless performance across all devices."
  },
  {
    icon: BiSupport,
    title: "Unmatched Support",
    desc:
      "Our expert team stands by you from kickoff through launch and beyond—enjoy two rounds of complimentary revisions and dedicated assistance every step of the way."
  },
  {
    icon: BiCommentDetail,
    title: "Prompt Communication",
    desc:
      "Experience seamless collaboration with lightning‑fast responses and transparent updates—so you’re always in the loop and never left waiting."
  }
];


export default function About() {
  return (
    <section id="about" className="relative scroll-mt-20">
    <Parallax
      bgImage={aboutHero}
      strength={600}
      bgImageStyle={{ minHeight: "100vh" }}
    >
      <section className="md:h-screen flex items-center">
        {/* overlay */}
        <div className="absolute inset-0 bg-black opacity-70" />

        {/* content */}
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center py-20">
          {/* headline */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center text-shadow-lg/50">
            We Are Not Just React & Tailwind Web Experts
          </h2>
          <p className="max-w-3xl text-white text-xl text-center mb-12 text-shadow-lg/50">
           Leveraging over a decade of expertise in web technologies and digital strategy, we collaborate closely with you to craft visually captivating, high‑performance solutions that accelerate growth and deliver measurable impact.
          </p>

          {/* 3‑column grid */}
          <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-opacity-10 rounded-lg p-6 flex flex-col items-center text-center text-shadow-lg/50"
              >
                <Icon className="text-6xl mb-4 text-[#3B82F6] text-shadow-lg/50" />
                <h3 className="text-xl font-extrabold text-white mb-2 text-shadow-lg/50">{title}</h3>
                <p className="text-white text-shadow-lg/50">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Parallax>
    </section>
  );
}
