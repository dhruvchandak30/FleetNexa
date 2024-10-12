'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-green-100 to-gray-100 shadow-md w-full fixed top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href="/">
                            <span className="text-2xl font-bold text-brown-700">
                                Fleet Nexa
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/">
                            <span className="text-gray-700 text-lg hover:text-[#A9592C]">
                                Home
                            </span>
                        </Link>
                        <Link href="/about">
                            <span className="text-gray-700 text-lg hover:text-[#A9592C]">
                                About us
                            </span>
                        </Link>
                        <Link href="/services">
                            <span className="text-gray-700 text-lg hover:text-[#A9592C]">
                                Services
                            </span>
                        </Link>
                        <Link href="/contact">
                            <span className="text-gray-700 text-lg hover:text-[#A9592C]">
                                Contact us
                            </span>
                        </Link>
                        <Link href="/book">
                            <button className="bg-[#A9592C] text-white py-2 px-4 rounded hover:text-gray-200">
                                Book now
                            </button>
                        </Link>
                    </div>
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/">
                            <span className="block text-gray-700 text-lg hover:bg-gray-100 rounded-md px-3 py-2">
                                Home
                            </span>
                        </Link>
                        <Link href="/about">
                            <span className="block text-gray-700 text-lg hover:bg-gray-100 rounded-md px-3 py-2">
                                About us
                            </span>
                        </Link>
                        <Link href="/services">
                            <span className="block text-gray-700 text-lg hover:bg-gray-100 rounded-md px-3 py-2">
                                Services
                            </span>
                        </Link>
                        <Link href="/contact">
                            <span className="block text-gray-700 text-lg hover:bg-gray-100 rounded-md px-3 py-2">
                                Contact us
                            </span>
                        </Link>
                        <Link href="/book">
                            <span className="block bg-brown-600 bg-[#A9592C] text-white text-lg text-center py-2 rounded hover:bg-brown-700">
                                Book now
                            </span>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
