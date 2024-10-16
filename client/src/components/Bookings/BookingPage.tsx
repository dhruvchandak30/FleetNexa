'use client';
import { useUserContext } from '@/context/UserContext';
import { useState } from 'react';

const BookingPage = () => {
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [capacity, setCapacity] = useState<number | null>(null);
    const [vehicleType, setVehicleType] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
    const { user, setUser } = useUserContext();
    console.log(user);
    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        const bookingData = {
            user_id: user?.id,
            pickup_location:pickupLocation,
            dropoff_location:dropoffLocation,
            capacity,
            vehicle_type:vehicleType,
            booking_time:bookingTime,
        };

        try {
            const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                const result = await response.json();
                const cost = result.estimatedCost || 10;
                setEstimatedCost(cost);
            } else {
                console.error('Error with booking request');
            }
        } catch (error) {
            console.error('Failed to send booking request:', error);
        }
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
                    <div className="mb-4">
                        <label className="block text-black mb-2">
                            Capacity
                        </label>
                        <select
                            value={capacity ?? ''}
                            onChange={(e) =>
                                setCapacity(parseInt(e.target.value, 10))
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="" disabled>
                                Select capacity
                            </option>
                            {[...Array(9).keys()].map((num) => (
                                <option key={num + 2} value={num + 2}>
                                    {num + 2}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-black mb-2">
                            Vehicle Type
                        </label>
                        <select
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="" disabled>
                                Select vehicle type
                            </option>
                            <option value="SUV">SUV</option>
                            <option value="Sedan">Sedan</option>
                            <option value="Truck">Truck</option>
                            <option value="Van">Van</option>
                            <option value="Motorcycle">Motorcycle</option>
                            <option value="Pickup">Pickup</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-black mb-2">
                            Booking Time
                        </label>
                        <input
                            type="datetime-local"
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
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
