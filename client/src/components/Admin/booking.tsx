'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Heading from '../Utils/Heading';

interface Booking {
    id?: number;
    userId: number;
    driverId?: number;
    vehicleId?: number;
    pickupLocation: string;
    dropoffLocation: string;
    bookingTime?: Date;
    status: string;
    estimatedCost: number;
}

const Bookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [estimatedCost, setEstimatedCost] = useState<number>(0);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/bookings');
            setBookings(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch bookings. Please try again later.');
        }
    };

    const addBooking = async () => {
        // Validation checks
        if (!pickupLocation || !dropoffLocation || estimatedCost <= 0) {
            setError('Please fill in all fields with valid values.');
            return;
        }

        setLoading(true);
        try {
            const bookingData: Booking = {
                userId: 1,
                pickupLocation,
                dropoffLocation,
                estimatedCost,
                status: status || 'pending',
            };
            await axios.post('http://localhost:5001/api/bookings/book', bookingData);
            fetchBookings();
            resetForm();
            setError('');
        } catch (err) {
            setError('Failed to add booking. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const deleteBooking = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5001/api/bookings/${id}`);
            fetchBookings();
            setError('');
        } catch (err) {
            setError('Failed to delete booking. Please try again later.');
        }
    };

    const resetForm = () => {
        setPickupLocation('');
        setDropoffLocation('');
        setEstimatedCost(0);
        setStatus('');
        setError(''); // Clear any existing error when resetting the form
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className="bg-gray-50 p-8 rounded-lg pt-24 shadow-md">
            <div className="max-w-7xl mx-auto">
                <Heading text="Manage Your Bookings" />
                <p className="text-black mb-6">
                    Use the form below to create new bookings and manage your existing ones.
                </p>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded mb-4">
                        {error}
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Pickup Location"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="border border-gray-300 p-3 rounded shadow-sm focus:outline-none focus:ring focus:ring-[#A9592C] focus:border-transparent"
                    />
                    <input
                        type="text"
                        placeholder="Dropoff Location"
                        value={dropoffLocation}
                        onChange={(e) => setDropoffLocation(e.target.value)}
                        className="border border-gray-300 p-3 rounded shadow-sm focus:outline-none focus:ring focus:ring-[#A9592C] focus:border-transparent"
                    />
                    <input
                        type="number"
                        placeholder="Estimated Cost"
                        value={estimatedCost}
                        onChange={(e) => setEstimatedCost(Number(e.target.value))}
                        className="border border-gray-300 p-3 rounded shadow-sm focus:outline-none focus:ring focus:ring-[#A9592C] focus:border-transparent"
                    />
                    <input
                        type="text"
                        placeholder="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border border-gray-300 p-3 rounded shadow-sm focus:outline-none focus:ring focus:ring-[#A9592C] focus:border-transparent"
                    />
                </div>
                <button
                    onClick={addBooking}
                    className="bg-[#A9592C] text-white p-3 rounded mt-4 hover:bg-opacity-90 shadow-md"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Booking'}
                </button>
                <h2 className="text-black text-xl mt-6 mb-4">Existing Bookings</h2>
                <ul className="border border-gray-300 rounded-lg shadow-sm">
                    {bookings.map((booking) => (
                        <li
                            key={booking.id}
                            className="flex justify-between items-center p-4 border-b last:border-b-0"
                        >
                            <span className="text-black">{`${booking.pickupLocation} to ${booking.dropoffLocation}`}</span>
                            <button
                                onClick={() => deleteBooking(booking.id!)}
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 shadow-md"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Bookings;
