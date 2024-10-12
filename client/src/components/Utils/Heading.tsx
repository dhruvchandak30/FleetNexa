import React from 'react';

interface HeadingProps {
  text: string;
}

const Heading: React.FC<HeadingProps> = ({ text }) => {
    return (
        <div>
            <h2 className="text-4xl font-bold text-center text-[#A9592C] mb-8">
                {text}
            </h2>
        </div>
    );
};

export default Heading;
