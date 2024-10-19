'use client';
import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import Heading from '../Utils/Heading';

interface Booking {
    id: string;
    pickup_location: { formatted: string };
    dropoff_location: { formatted: string };
    status: 'pending' | 'On the way' | 'Arrived' | 'In transit';
    estimated_cost: number;
}

const MyBookings = () => {
    const { user } = useUserContext();
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDriverBookings = async () => {
            try {
                const response = await fetch(
                    'http://localhost:5000/api/bookings/getDriverBookings',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ driver_id: user?.id }),
                    }
                );

                const data = await response.json();
                if (response.ok) {
                    setBookings(data.bookings || []);
                } else {
                    setError(data.message || 'Failed to fetch bookings.');
                }
            } catch (error) {
                setError('Error fetching bookings.');
            } finally {
                setLoading(false);
            }
        };

        fetchDriverBookings();
    }, [user]);

    const handleAcceptBooking = async (bookingId: string) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/bookings/acceptBooking`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        booking_id: bookingId,
                    }),
                }
            );

            if (response.ok) {
                router.push(`/getparcel/${bookingId}`);
            } else {
                setError('Failed to accept booking.');
            }
        } catch (error) {
            setError('Error accepting booking.');
        }
    };

    if (loading) return <p className="mt-12 py-12">Loading bookings...</p>;
    if (error) return <p className="mt-12 py-12">{error}</p>;

    return (
        <div className="p-6 my-12 pt-12 bg-gradient-to-br from-[#d2eae5] to-[#ead9ce] min-h-screen">
            <Heading text="My Bookings" />
            {bookings.length === 0 ? (
                <p className="text-center text-gray-600">No bookings found.</p>
            ) : (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {bookings.length > 0 &&
                        bookings.map((booking, index) => (
                            <div
                                key={index}
                                className="p-6 bg-white shadow-lg rounded-lg border border-[#A9592C] hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="mb-2">
                                    <p className="text-sm text-gray-500 font-semibold">
                                        Pickup Location
                                    </p>
                                    <p className="text-lg text-gray-800">
                                        {booking.pickup_location.formatted}
                                    </p>
                                </div>
                                <div className="mb-2">
                                    <p className="text-sm text-gray-500 font-semibold">
                                        Dropoff Location
                                    </p>
                                    <p className="text-lg text-gray-800">
                                        {booking.dropoff_location.formatted}
                                    </p>
                                </div>
                                <div className="mb-2">
                                    <p className="text-sm text-gray-500 font-semibold">
                                        Estimated Cost
                                    </p>
                                    <p className="text-lg text-gray-800">
                                        ₹{booking.estimated_cost.toFixed(2)}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500 font-semibold">
                                        Status
                                    </p>
                                    <p
                                        className={`text-lg font-medium ${
                                            booking.status === 'pending'
                                                ? 'text-yellow-600'
                                                : booking.status ===
                                                  'On the way'
                                                ? 'text-blue-600'
                                                : booking.status === 'Arrived'
                                                ? 'text-green-600'
                                                : 'text-purple-600'
                                        }`}
                                    >
                                        {booking.status}
                                    </p>
                                </div>
                                {booking.status === 'pending' && (
                                    <button
                                        onClick={() =>
                                            handleAcceptBooking(booking.id)
                                        }
                                        className="mt-4 bg-[#A9592C] text-white px-4 py-2 rounded-lg hover:bg-[#8f4428] transition-colors duration-300"
                                    >
                                        Accept Booking
                                    </button>
                                )}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
