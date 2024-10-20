import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Boy from '@/assets/delivery-boy.png';

const Hero = () => {
    return (
        <>
            <section className="bg-gradient-to-r from-[#d2eae5] to-[#ead9ce] lg:h-screen h-full flex lg:pt-0 pt-24 items-center">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8">
                    <div className="text-center md:text-left lg:w-1/2 w-full">
                        <h1 className="text-5xl font-bold text-gray-900 mb-4">
                            We can move you everywhere.{' '}
                            <span className="text-[#A9592C]">
                                Fast and Easily
                            </span>
                        </h1>
                        <p className="text-lg text-black font-semibold mb-6">
                            Facilisis gravida neque convallis a cras semper
                            auctor neque vitae. Massa ultricies mi quis
                            hendrerit dolor magna. Vulputate eu scelerisque.
                        </p>
                        <Link href="/book">
                            <button className="bg-[#A9592C] text-white py-3 px-6 rounded-lg hover:bg-opacity-90">
                                Book now
                            </button>
                        </Link>
                    </div>
                    <div className="mt-8 md:mt-0">
                        <Image
                            src={Boy.src}
                            alt="Delivery person holding a box ready for transportation"
                            width={500}
                            height={500}
                            className="rounded-lg object-cover"
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
