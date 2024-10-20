'use client';
import { useState, useEffect } from 'react';
import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

interface Location {
    lat: number;
    lng: number;
}

interface Booking {
    id: string;
    pickup_location: { lat: number; lng: number; formatted: string };
    dropoff_location: { lat: number; lng: number; formatted: string };
    driver: { name: string; phone_number: string };
    status: 'pending' | 'On the way' | 'Arrived' | 'In transit';
    estimated_cost: number;
}

const TrackingPage = () => {
    const { user } = useUserContext();
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BOOKING_SERVICE_URL}/api/bookings/getbookings`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ user_id: user?.id }),
                    }
                );
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user?.id]);

    const handleBookingClick = (booking: Booking) => {
        router.push(`/trackparcel/${booking.id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#d2eae5] to-[#ead9ce] flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-bold mb-6 text-[#A9592C]">
                My Bookings
            </h1>

            {loading ? (
                <p className="text-gray-600">Loading bookings...</p>
            ) : (
                <ul className="w-full max-w-4xl mb-6 space-y-6">
                    {bookings.length > 0 &&
                        bookings.map((booking) => (
                            <li
                                key={booking.id}
                                className="p-5 border-2 border-[#A9592C] rounded-xl shadow-lg cursor-pointer hover:bg-opacity-10 transition-all hover:shadow-xl"
                                onClick={() => handleBookingClick(booking)}
                            >
                                <p
                                    className={`text-gray-800 ${
                                        booking.status === 'pending'
                                            ? 'text-red-600'
                                            : booking.status === 'On the way'
                                            ? 'text-yellow-600'
                                            : booking.status === 'Arrived' ||
                                              booking.status === 'In transit'
                                            ? 'text-green-600'
                                            : ''
                                    }`}
                                >
                                    <strong>Status:</strong>{' '}
                                    {booking.status.charAt(0).toUpperCase() +
                                        booking.status.slice(1)}
                                </p>

                                <p className="text-gray-800">
                                    <strong>Estimated Cost:</strong> $
                                    {booking.estimated_cost}
                                </p>
                                <p className="text-gray-800">
                                    <strong>Pickup:</strong>{' '}
                                    {booking.pickup_location.formatted}
                                </p>
                                <p className="text-gray-800">
                                    <strong>Drop-off:</strong>{' '}
                                    {booking.dropoff_location.formatted}
                                </p>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};

export default TrackingPage;
