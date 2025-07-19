// src/components/Footer.jsx
import React from 'react'
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa'
import logo from '../assets/bsquaredlogowhite.png'


export default function Footer() {
    return (
        <footer className="relative w-screen bg-[#0187e3] left-1/2 -translate-x-1/2">
            {/* Main content */}
            <div className="max-w-screen container mx-10 md:mx-40 md:px-6 md:mt-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Branding */}
                <div>
                    <img
                        src={logo}
                        alt="B Squared Solutions"
                        className="h-26 w-auto items-center px-25 md:h-30 mb-4 md:px-0 md:w-auto"
                    />
                    {/* <p className="text-md text-white pr-20 text-center md:text-left">
                        Your go‑to digital growth partner—offering bespoke React & Tailwind websites, strategic technical consulting, data‑driven SEO & marketing, and dedicated ongoing support to power your online success.
                    </p> */}
                </div>

                {/* Explore links */}
                <div className="flex md:justify-between">
                    <div>
                        <h4 className="text-white text-xl text-shadow-lg text-shadow-gray-700/30 font-semibold mb-2">Explore</h4>
                        <ul className="space-y-1 text-md text-white">

                            <li><a href="#services" className="hover:text-gray-700">Services</a></li>
                            <li><a href="#pricing" className="hover:text-gray-700">Pricing</a></li>
                            <li><a href="#about" className="hover:text-gray-700">Why Choose Us</a></li>
                            <li><a href="#contact" className="hover:text-gray-700">Get a Free Quote</a></li>
                        </ul>
                    </div>

                    <div className='ml-20 md:ml-0'>
                        <h4 className="text-white text-xl font-semibold mb-2 text-shadow-lg text-shadow-gray-700/30">Follow Us</h4>
                        <div className="flex space-x-4 text-white">
                            <a href="#" aria-label="Twitter" className="hover:text-gray-700" target='_blank'><FaTwitter size={30} /></a>
                            <a href="#" aria-label="YouTube" className="hover:text-gray-700" target='_blank'><FaYoutube size={30} /></a>
                            <a href="#" aria-label="Instagram" className="hover:text-gray-700" target='_blank'><FaInstagram size={30} /></a>
                        </div>
                    </div>
                </div>


            </div>

            {/* Bottom bar */}
            <div className="w-full">
                <div className="max-w-screen-xl mx-auto px-6 py-2 text-center text-white text-sm">
                    © {new Date().getFullYear()} B Squared Solutions. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
