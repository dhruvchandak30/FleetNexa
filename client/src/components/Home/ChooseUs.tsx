import React from 'react';
import girl from '@/assets/delivery-girl.jpeg';
import Image from 'next/image';
import Head from 'next/head';
import Heading from '../Utils/Heading';

const ChooseUs = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-between bg-gradient-to-r from-[#d2eae5] to-[#ead9ce] p-10 lg:p-20">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
                <Image
                    src={girl.src}
                    alt="Delivery Worker"
                    className="rounded-lg shadow-md lg:w-3/4"
                    width={300}
                    height={300}
                />
            </div>

            <div className="lg:w-1/2 space-y-8">
                <Heading text="Why Choose Us?" />

                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                        <span className="text-4xl text-[#A9592C]">⚡</span>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold">Right on Time</h3>
                        <p className="text-gray-600">
                            We understand the value of time. Our logistics and
                            delivery services are optimized to ensure that your
                            packages arrive right on schedule, every time.
                        </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                        <span className="text-4xl text-[#A9592C]">💰</span>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold">Cost Saving</h3>
                        <p className="text-gray-600">
                            We help you save costs with our competitive pricing
                            and efficient operations. Enjoy top-tier services at
                            affordable rates, keeping your budget in mind.
                        </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                        <span className="text-4xl text-[#A9592C]">🛡️</span>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold">Safe & Secure</h3>
                        <p className="text-gray-600">
                            Your packages are in safe hands. With
                            state-of-the-art security measures and real-time
                            tracking, we ensure that your items are protected
                            throughout the journey.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChooseUs;
