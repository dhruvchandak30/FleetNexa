'use client';
import { useState } from 'react';

const BookingPage = () => {
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');

    const [estimatedCost, setEstimatedCost] = useState<number | null>(null);

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault();
        const cost = 0;
        setEstimatedCost(cost);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
                <h1
                    className="text-3xl font-bold mb-6"
                    style={{ color: '#A9592C' }}
                >
                    Book Your Ride
                </h1>
                <form onSubmit={handleBooking}>
                    <div className="mb-4">
                        <label className="block text-black mb-2">
                            Pickup Location
                        </label>
                        <input
                            type="text"
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black mb-2">
                            Drop-off Location
                        </label>
                        <input
                            type="text"
                            value={dropoffLocation}
                            onChange={(e) => setDropoffLocation(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#A9592C] text-white py-2 rounded-md hover:bg-opacity-90"
                    >
                        Calculate Cost
                    </button>
                </form>
                {estimatedCost !== null && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-black">
                            Estimated Cost: ${estimatedCost}
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingPage;
