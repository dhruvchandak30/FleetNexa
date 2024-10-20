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
    pickup_location: {
        lat: any;
        lng: any;
        formatted: any;
        timezone: any;
    };
    dropoff_location: {
        lat: any;
        lng: any;
        formatted: any;
        timezone: any;
    };
    booking_time?: Date;
    status: string;
    estimated_cost: number;
    rating: number;
}

const Bookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [error, setError] = useState('');
    const router = useRouter();

    const fetchBookings = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_ADMIN_SERVICE_URL}/api/bookings`
            );
            setBookings(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch bookings. Please try again later.');
        }
    };

    const fetchDriver = async (id: number) => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_ADMIN_SERVICE_URL}/api/drivers/${id}`
            );
            return response.data;
        } catch (err) {
            return null;
        }
    };

    const fetchVehicle = async (id: number) => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_ADMIN_SERVICE_URL}/api/vehicles/${id}`
            );
            return response.data;
        } catch (err) {
            return null;
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleBookingClick = (id: number) => {
        router.push(`/admin/booking/${id}`);
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8 my-12">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <Heading text="Manage Bookings" />

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
                                        {booking.pickup_location.formatted} to{' '}
                                        {booking.dropoff_location.formatted}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Status:{' '}
                                        <span className="capitalize">
                                            {booking.status}
                                        </span>
                                    </p>
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
