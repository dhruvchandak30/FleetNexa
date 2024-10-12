import React from 'react';
import Heading from '../Utils/Heading';

const OurServices = () => {
    return (
        <div className="bg-gradient-to-r from-[#d2eae5] to-[#ead9ce]  h-full flex lg:pt-0  items-center">
            <div className="max-w-7xl mx-auto flex flex-col justify-between items-center px-4 py-12 sm:px-6 lg:px-8">
                <Heading text="Our Services" />
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                    {/* Relocation & Logistics */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-[#A9592C] mb-4">
                            <i className="fas fa-building fa-2x"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                            Relocation & Logistics
                        </h3>
                        <p className="text-gray-600">
                            Seamlessly manage the relocation of goods across
                            cities or countries with FleetNexa’s reliable and
                            secure logistics services, ensuring timely
                            deliveries at every step.
                        </p>
                    </div>

                    {/* Courier & Delivery */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-[#A9592C] mb-4">
                            <i className="fas fa-truck fa-2x"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                            Courier & Delivery
                        </h3>
                        <p className="text-gray-600">
                            Swift, hassle-free courier services designed to
                            transport packages from your doorstep to the
                            recipient in no time, with real-time tracking for
                            peace of mind.
                        </p>
                    </div>

                    {/* Transportation Services */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-[#A9592C] mb-4">
                            <i className="fas fa-shuttle-van fa-2x"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                            Transportation Services
                        </h3>
                        <p className="text-gray-600">
                            Whether you’re moving heavy goods or need regular
                            transportation, our fleet is equipped to handle all
                            types of freight with ease and safety, no matter the
                            distance.
                        </p>
                    </div>

                    {/* Car Rental, Sales & Pick-up */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-[#A9592C] mb-4">
                            <i className="fas fa-car fa-2x"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                            Car Rental, Sales & Pick-up
                        </h3>
                        <p className="text-gray-600">
                            FleetNexa offers flexible car rental options,
                            vehicle sales, and convenient pick-up services,
                            perfect for both personal and business use.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurServices;
