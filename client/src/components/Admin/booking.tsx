'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Heading from '../Utils/Heading';

interface Booking {
    id?: number;
    user_id: number;
    driver_id?: number;
    vehicle_id?: number;
    pickup_location: string;
    dropoff_location: string;
    booking_time?: Date;
    status: string;
    estimatedCost: number;
}

const Bookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [error, setError] = useState('');
    const router = useRouter();

    const fetchBookings = async () => {
        try {
            const response = await axios.get(
                'https://admin-service-olive.vercel.app/api/bookings'
            );
            setBookings(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch bookings. Please try again later.');
        }
    };

    const handleStatusUpdate = async (id: number, status: string) => {
        try {
            await axios.patch(`https://admin-service-olive.vercel.app/api/bookings/status`, {
                id,
                status,
            });
            fetchBookings();
            setError('');
        } catch (err) {
            setError(
                'Failed to update booking status. Please try again later.'
            );
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleBookingClick = (id: number) => {
        router.push(`/admin/booking/${id}`);
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <Heading text="Manage Your Bookings" />

                <h2 className="text-xl text-gray-800 mt-6 mb-4 font-semibold">
                    Existing Bookings
                </h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <ul className="space-y-4">
                    {bookings.length === 0 ? (
                        <p className="text-gray-500">No bookings found.</p>
                    ) : (
                        bookings.map((booking) => (
                            <li
                                key={booking.id}
                                className="bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer p-4 rounded-lg flex justify-between items-center shadow-sm border border-gray-200"
                            >
                                <div
                                    onClick={() =>
                                        handleBookingClick(booking.id!)
                                    }
                                >
                                    <p className="text-gray-700 font-medium">
                                        {booking.pickup_location} to{' '}
                                        {booking.dropoff_location}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Status:{' '}
                                        <span className="capitalize">
                                            {booking.status}
                                        </span>
                                    </p>
                                </div>

                                <div className="flex space-x-2">
                                    {booking.status === 'accepted' ? (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleStatusUpdate(
                                                    booking.id!,
                                                    'rejected'
                                                );
                                            }}
                                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                                        >
                                            Reject
                                        </button>
                                    ) : booking.status === 'rejected' ? (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleStatusUpdate(
                                                    booking.id!,
                                                    'accepted'
                                                );
                                            }}
                                            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
                                        >
                                            Accept
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleStatusUpdate(
                                                        booking.id!,
                                                        'accepted'
                                                    );
                                                }}
                                                className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleStatusUpdate(
                                                        booking.id!,
                                                        'rejected'
                                                    );
                                                }}
                                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Bookings;
