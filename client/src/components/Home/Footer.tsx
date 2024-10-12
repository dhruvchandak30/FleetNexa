import React from 'react';

const Footer = () => {
  return (
    <div className="bg-[#A9592C] text-white py-10 px-6">
      <div className="container max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold">Fleet Nexa</h2>
          <p className="mt-2 text-sm">
            When you’re moving from your old house to a new location, there are thousands of things to be taken care of. We’ll be your assistants, helping you move all your belongings fast wherever you wish.
          </p>
          <div className="flex space-x-4 mt-4 text-sm">
            <a href="#" className="hover:underline">Instagram</a>
            <a href="#" className="hover:underline">Twitter</a>
            <a href="#" className="hover:underline">Facebook</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Trucking & Haulage</a></li>
            <li><a href="#" className="hover:underline">Relocation & Logistics</a></li>
            <li><a href="#" className="hover:underline">Car Rental</a></li>
            <li><a href="#" className="hover:underline">Courier Services</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">Location: Liberation Road, CA</p>
          <p className="text-sm">Phone: +1-234-5675-57</p>
          <p className="text-sm">
            Email: <a href="mailto:info@fleetnexa.com" className="hover:underline">info@fleetnexa.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
