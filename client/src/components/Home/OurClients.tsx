import React from 'react';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import client1 from '@/assets/client1.png';
import client2 from '@/assets/client2.jpeg';
import client3 from '@/assets/client3.png';
import client4 from '@/assets/client4.jpeg';
import client5 from '@/assets/client5.png';
import Heading from '../Utils/Heading';

const OurClients = () => {
    const clients = [client1, client2, client3, client4, client5, client2, client4];

    return (
        <div className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Heading text="Our Clients" />
                <Marquee speed={60} gradient={false}>
                    <div className="flex items-center justify-between space-x-12">
                        {clients.map((client, index) => (
                            <div key={index} className="">
                                <Image
                                    src={client}
                                    alt={`Client ${index + 1}`}
                                    width={150}
                                    height={100}
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </Marquee>
            </div>
        </div>
    );
};

export default OurClients;
