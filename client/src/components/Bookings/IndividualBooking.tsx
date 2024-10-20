'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Heading from '@/components/Utils/Heading';

interface Booking {
    id: number;
    name: string;
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
    estimated_cost: number;
    booking_time: string;
    status: string;
    driver: {
        name: string;
        phone_number: string;
    };
    vehicle: {
        type: string;
        license_plate: string;
        capacity: number;
    };
    rating: number;
}

const BookingDetails = ({ id }: { id: string }) => {
    const [booking, setBooking] = useState<Booking | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchBookingDetails = async () => {
        try {
            const response = await axios.get(
                `https://admin-service-olive.vercel.app/api/bookings/${id}`
            );
            setBooking(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch booking details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookingDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    if (error) {
        return <div className="p-8 text-red-500">{error}</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen p-8 pt-24 shadow-md">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <Heading text="Booking Details" />

                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        Journey Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-100 p-4 rounded-lg shadow">
                            <p className="text-gray-600">
                                <strong>Pickup Location:</strong>{' '}
                                {booking?.pickup_location.formatted}
                            </p>
                            <p className="text-gray-600">
                                <strong>Dropoff Location:</strong>{' '}
                                {booking?.dropoff_location.formatted}
                            </p>
                            <p className="text-gray-600">
                                <strong>Estimated Cost:</strong> $
                                {booking?.estimated_cost.toFixed(2)}
                            </p>
                            <p className="text-gray-600">
                                <strong>Status:</strong> {booking?.status}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        Driver Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-100 p-4 rounded-lg shadow">
                            <p className="text-gray-700">
                                <strong>Name:</strong> {booking?.driver.name}
                            </p>
                            <p className="text-gray-700">
                                <strong>Phone Number:</strong>{' '}
                                {booking?.driver.phone_number}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        Vehicle Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-green-100 p-4 rounded-lg shadow">
                            <p className="text-gray-700">
                                <strong>Type:</strong> {booking?.vehicle.type}
                            </p>
                            <p className="text-gray-700">
                                <strong>License Plate:</strong>{' '}
                                {booking?.vehicle.license_plate}
                            </p>
                            <p className="text-gray-700">
                                <strong>Capacity:</strong>{' '}
                                {booking?.vehicle.capacity}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        Rating
                    </h3>
                    <div className="bg-yellow-100 p-4 rounded-lg shadow">
                        <p className="text-gray-700">
                            <strong>Rating:</strong> {booking?.rating}/5
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;
