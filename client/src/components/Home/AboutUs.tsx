import React from 'react';
import Heading from '../Utils/Heading';

const AboutUs = () => {
    return (
        <section id='about-us' className="bg-gray-50 text-black py-16 px-6">
            <div className="container mx-auto text-center lg:text-left max-w-4xl">
                <Heading text="About Us" />

                <p className="text-lg mb-6 text-justify">
                    At Fleet Nexa, we pride ourselves on delivering fast,
                    reliable, and efficient moving and logistics services. From
                    local relocations to long-distance haulage, we ensure that
                    your belongings arrive safely and on time, every time.
                </p>

                <p className="text-lg mb-6 text-justify">
                    Our team is comprised of skilled professionals who are
                    dedicated to meeting your specific needs, whether you're
                    moving across town or across the country. With a strong
                    focus on customer satisfaction, Fleet Nexa guarantees a
                    seamless experience from start to finish.
                </p>

                <p className="text-lg text-justify">
                    Trust Fleet Nexa to be your go-to logistics partner for all
                    your moving and transportation requirements. Let us take the
                    hassle out of your move so you can focus on what matters
                    most.
                </p>
            </div>
        </section>
    );
};

export default AboutUs;
