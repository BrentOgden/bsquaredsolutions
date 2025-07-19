// src/components/Quotes.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsDashLg } from "react-icons/bs";


const quotes = [
    {
        user: "Emily Carlson",
        quote: "B² Solutions completely revitalized our website—performance is lightning‑fast, and our conversion rate has doubled in just three months.",

    },
    {
        user: "David Nguyen",
        quote: "Their team guided us through every step—from design mockups to SEO strategy. We’ve never felt more confident in our online presence.",

    },
    {
        user: "Sophia Martinez",
        quote: "I was blown away by their attention to detail and responsiveness. They delivered a bespoke React site that perfectly captures our brand.",

    },
    {
        user: "Marcus Lee",
        quote: "The consulting sessions were invaluable—our architecture audit uncovered optimizations that cut our page load times in half.",
        description: "CTO, FinEdge Analytics"
    },
    {
        user: "Aisha Thompson",
        quote: "From day one, the communication was seamless. They turned our vision into reality and continue to support our growth.",
        description: "Operations Manager, Summit Events Co."
    },
    {
        user: "Carlos Rivera",
        quote: "Their SEO & marketing expertise propelled us to page one on Google within weeks—traffic and leads have skyrocketed.",
        description: "Marketing Lead, Canyon Coffee Roasters"
    },
    {
        user: "Olivia Bennett",
        quote: "Ongoing support is a game‑changer. Any tweak or new feature we request is handled promptly and professionally.",
        description: "Product Manager, CloudSync Solutions"
    }
];


export default function QuoteScroller({ interval = 5000, typeSpeed = 50 }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedDesc, setDisplayedDesc] = useState('');

    // cycle quotes
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((i) => (i + 1) % quotes.length);
        }, interval);
        return () => clearInterval(timer);
    }, [interval]);

    // typewriter effect for description
    useEffect(() => {
        const fullDesc = quotes[currentIndex].description;
        setDisplayedDesc('');  // reset
        let idx = 0;
        const typer = setInterval(() => {
            setDisplayedDesc(fullDesc.slice(0, idx + 1));
            idx += 1;
            if (idx >= fullDesc.length) {
                clearInterval(typer);
            }
        }, typeSpeed);
        return () => clearInterval(typer);
    }, [currentIndex, typeSpeed]);

    return (
        <section className="rounded-xl shadow-lg py-10 md:py-22">
            <h2 className="text-4xl font-bold p-4 mb-6 text-gray-700 text-center">Hear From Our Happy Customers</h2>
            <div className="mx-auto max-w-6xl py-6 rounded md:shadow-xl">

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8 }}
                        className="text-center p-6"
                    >
                        <blockquote className="italic text-xl md:text-2xl">
                            “{quotes[currentIndex].quote}”
                        </blockquote>
                        <p className="mt-4 text-[#3B82F6] text-2xl font-semibold inline-flex items-center">
                            <BsDashLg className="mr-2 text-2xl" />
                            {quotes[currentIndex].user}
                        </p>

                        {/* <p className="mt-2 text-xl">
              {quotes[currentIndex].description}
            </p> */}

                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
