'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useUserContext } from '@/context/UserContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, setUser } = useUserContext();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleLogout = () => {
        setUser(null);
    };

    const handleLinkClick = (id: string) => {
        if (isOpen) {
            setIsOpen(false);
        }

        if (window.location.pathname !== '/') {
            window.location.href = '/#' + id;
        } else {
            scrollToSection(id);
        }
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
                        <Link href="/" onClick={() => handleLinkClick('home')}>
                            <span className="text-gray-700 text-lg hover:text-[#A9592C] cursor-pointer">
                                Home
                            </span>
                        </Link>
                        <Link
                            href="#about-us"
                            onClick={() => handleLinkClick('about-us')}
                        >
                            <span className="text-gray-700 text-lg hover:text-[#A9592C] cursor-pointer">
                                About us
                            </span>
                        </Link>
                        <Link
                            href="#services"
                            onClick={() => handleLinkClick('services')}
                        >
                            <span className="text-gray-700 text-lg hover:text-[#A9592C] cursor-pointer">
                                Services
                            </span>
                        </Link>
                        <Link href="/contact">
                            <span className="text-gray-700 text-lg hover:text-[#A9592C] cursor-pointer">
                                Contact us
                            </span>
                        </Link>
                        {user ? (
                            <>
                                {user.type === 'admin' && (
                                    <>
                                        <Link href="/admin/driver">
                                            <button className="bg-[#A9592C] text-white py-2 px-4 rounded hover:text-gray-200">
                                                Drivers
                                            </button>
                                        </Link>
                                        <Link href="/admin/booking">
                                            <button className="bg-[#A9592C] text-white py-2 px-4 rounded hover:text-gray-200">
                                                Bookings
                                            </button>
                                        </Link>
                                        <Link href="/admin/vehicle">
                                            <button className="bg-[#A9592C] text-white py-2 px-4 rounded hover:text-gray-200">
                                                Vehicles
                                            </button>
                                        </Link>
                                    </>
                                )}
                                {user.type === 'driver' && <div>
                                    <Link href="/mybookings">
                                            <button className="bg-[#A9592C] text-white py-2 px-4 rounded hover:text-gray-200">
                                                Bookings
                                            </button>
                                        </Link>
                                 
                                    
                                    </div>}
                                {user.type === 'user' && (
                                    <>
                                        <Link href="/book">
                                            <button className="bg-[#A9592C] text-white py-2 px-4 rounded hover:text-gray-200">
                                                Book now
                                            </button>
                                        </Link>
                                        <Link href="/track">
                                            <button className="bg-[#A9592C] text-white py-2 px-4 rounded hover:text-gray-200">
                                                Track Orders
                                            </button>
                                        </Link>
                                    </>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="bg-[#A9592C] text-white py-2 px-4 rounded hover:text-gray-200"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <button className="bg-[#A9592C] text-white py-2 px-4 rounded hover:text-gray-200">
                                        Login
                                    </button>
                                </Link>
                                <Link href="/signup">
                                    <button className="bg-[#A9592C] text-white py-2 px-4 rounded hover:text-gray-200">
                                        SignUp
                                    </button>
                                </Link>
                            </>
                        )}
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
                        <Link href="/" onClick={() => handleLinkClick('home')}>
                            <span className="block text-gray-700 text-lg hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer">
                                Home
                            </span>
                        </Link>
                        <Link
                            href="#about-us"
                            onClick={() => handleLinkClick('about-us')}
                        >
                            <span className="block text-gray-700 text-lg hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer">
                                About us
                            </span>
                        </Link>
                        <Link
                            href="#services"
                            onClick={() => handleLinkClick('services')}
                        >
                            <span className="block text-gray-700 text-lg hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer">
                                Services
                            </span>
                        </Link>
                        <Link href="/contact">
                            <span className="block text-gray-700 text-lg hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer">
                                Contact us
                            </span>
                        </Link>
                        {user ? (
                            <>
                                {user.type === 'admin' ? (
                                    <>
                                        <Link href="/admin/driver">
                                            <span className="block bg-[#A9592C] text-white text-lg text-center py-2 rounded hover:bg-opacity-90">
                                                Drivers
                                            </span>
                                        </Link>
                                        <Link href="/admin/booking">
                                            <span className="block bg-[#A9592C] text-white text-lg text-center py-2 rounded hover:bg-opacity-90">
                                                Bookings
                                            </span>
                                        </Link>
                                        <Link href="/admin/vehicle">
                                            <span className="block bg-[#A9592C] text-white text-lg text-center py-2 rounded hover:bg-opacity-90">
                                                Vehicles
                                            </span>
                                        </Link>
                                    </>
                                ) : (
                                    <Link href="/book">
                                        <span className="block bg-[#A9592C] text-white text-lg text-center py-2 rounded hover:bg-opacity-90">
                                            Book now
                                        </span>
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="block bg-[#A9592C] text-white text-lg text-center py-2 rounded hover:bg-opacity-90"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link href="/login">
                                <span className="block bg-[#A9592C] text-white text-lg text-center py-2 rounded hover:bg-opacity-90">
                                    Login
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
