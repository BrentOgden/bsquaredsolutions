// src/components/Footer.jsx
import React from 'react'
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa'
import logo from '../assets/bsquaredlogowhite.png'
import { SiVenmo } from "react-icons/si";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";




export default function Footer() {
    return (
        <footer className="relative w-screen bg-primary left-1/2 -translate-x-1/2">
            {/* Main content */}
            <div className="max-w-screen container mx-10 md:mx-40 md:px-6 md:mt-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Branding */}
                <div>
                    <img
                        src={logo}
                        alt="B Squared Solutions"
                        className="h-26 w-auto items-center px-25 md:h-25 mb-6 md:px-0 md:w-auto"
                    />
                    <div className="space-y-2 text-white text-left md:text-left">
                        <div className="flex md:items-center  justify-left ml-10 md:ml-0">
                            <MdOutlineMailOutline className="mr-2 text-xl" />
                            <a
                                href="mailto:support@bsquaredsolutions.io"
                                className="hover:text-gray-700"
                            >
                                support@bsquaredsolutions.io
                            </a>
                        </div>
                        <div className="flex md:items-center justify-left ml-10 md:ml-0">
                            <IoIosPhonePortrait className="mr-2 text-xl" />
                            <a
                                href="tel:7202545354"
                                className="hover:text-gray-700"
                            >
                                720.254.5354
                            </a>
                        </div>
                    </div>
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
                        <div className="text-white mt-6 text-left space-y-1">
                            Payments accepted via <SiVenmo className="text-6xl text-left -my-4 leading-none" />
                        </div>
                    </div>
                </div>
                <div>

                </div>

            </div>

            {/* Bottom bar */}
            <div className="w-full">
                <div className="max-w-screen-xl mx-auto px-6 py-2 text-center text-white text-sm">
                    © {new Date().getFullYear()} B Squared Solutions. All rights reserved.
                    <a href="/terms" className="hover:text-gray-700 text-white ml-1 md:ml-4">Terms |</a>
                    <a href="/privacy" className="hover:text-gray-700 text-white"> Privacy</a>

                </div>
            </div>
        </footer>
    )
}
