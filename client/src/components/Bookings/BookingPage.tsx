'use client';
import { useUserContext } from '@/context/UserContext';
import { useState } from 'react';
const opencage = require('opencage-api-client');

const BookingPage = () => {
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [capacity, setCapacity] = useState<number | null>(null);
    const [vehicleType, setVehicleType] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [estimatedCost, setEstimatedCost] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    interface Driver {
        name: string;
        phone_number: string;
    }
    interface Vehicle {
        type: string;
        capacity: number;
        license_plate: string;
    }

    const [driver, setDriver] = useState<Driver | null>(null);
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [showDetails, setShowDetails] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { user } = useUserContext();

    const fetchCoordinates = async (location: string) => {
        try {
            const data = await opencage.geocode({
                q: location,
                key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY,
            });
            if (data.status.code === 200 && data.results.length > 0) {
                const place = data.results[0];
                return {
                    lat: place.geometry.lat,
                    lng: place.geometry.lng,
                    formatted: place.formatted,
                    timezone: place.annotations.timezone.name,
                };
            } else {
                throw new Error(`No results found: ${data.status.message}`);
            }
        } catch (error: any) {
            console.error('Error fetching coordinates:', error.message);
            if (error.status?.code === 402) {
                console.error('Hit free trial daily limit');
            }
            throw new Error('Error with geocoding API', error);
        }
    };

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        setLoading(true);

        if (!user?.id) {
            setErrorMessage('You must be logged in to create a booking.');
            setLoading(false);
            return;
        }

        if (
            !pickupLocation ||
            !dropoffLocation ||
            !capacity ||
            !vehicleType ||
            !bookingTime
        ) {
            setErrorMessage('Please fill in all required fields.');
            setLoading(false);
            return;
        }

        try {
            const pickupCoords = await fetchCoordinates(pickupLocation);
            const dropoffCoords = await fetchCoordinates(dropoffLocation);
            console.log(pickupCoords);
            console.log(dropoffCoords);

            if (pickupCoords && dropoffCoords) {
                const bookingData = {
                    user_id: user.id,
                    pickup_location: pickupCoords,
                    dropoff_location: dropoffCoords,
                    capacity,
                    vehicle_type: vehicleType,
                    booking_time: bookingTime,
                };
                console.log(bookingData);

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BOOKING_SERVICE_URL}/api/bookings`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(bookingData),
                    }
                );

                if (response.ok) {
                    const result = await response.json();
                    setDriver(result.data[0]);
                    setVehicle(result.data[1]);
                    setEstimatedCost(result.data[2]);
                    setShowDetails(true);
                    setSuccessMessage('Booking created successfully!');
                } else {
                    const errorResult = await response.json();
                    setErrorMessage(
                        errorResult.error ||
                            'There was an issue with your booking. Please try again.'
                    );
                }
            } else {
                setErrorMessage(
                    'Could not fetch coordinates for one or both locations.'
                );
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(
                'An unexpected error occurred. Please try again later.'
            );
        } finally {
            setLoading(false);
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

                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#A9592C]"></div>
                    </div>
                ) : !showDetails ? (
                    <form onSubmit={handleBooking}>
                        <div className="mb-4">
                            <label className="block text-black mb-2">
                                Pickup Location
                            </label>
                            <input
                                type="text"
                                value={pickupLocation}
                                onChange={(e) =>
                                    setPickupLocation(e.target.value)
                                }
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
                                onChange={(e) =>
                                    setDropoffLocation(e.target.value)
                                }
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
                            Book Now
                        </button>
                    </form>
                ) : (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-black mb-6 border-b-2 border-gray-300 pb-2">
                            Booking Details
                        </h2>
                        <div className="mb-6">
                            <p className="text-lg text-gray-800">
                                <span className="font-bold">Driver Name:</span>{' '}
                                {driver?.name}
                            </p>
                            <p className="text-lg text-gray-800">
                                <span className="font-bold">Driver Phone:</span>{' '}
                                {driver?.phone_number}
                            </p>
                        </div>
                        <div className="mb-6">
                            <p className="text-lg text-gray-800">
                                <span className="font-bold">Vehicle Type:</span>{' '}
                                {vehicle?.type}
                            </p>
                            <p className="text-lg text-gray-800">
                                <span className="font-bold">
                                    Vehicle Capacity:
                                </span>{' '}
                                {vehicle?.capacity}
                            </p>
                            <p className="text-lg text-gray-800">
                                <span className="font-bold">
                                    License Plate:
                                </span>{' '}
                                {vehicle?.license_plate}
                            </p>
                        </div>
                        <p className="text-lg text-gray-800">
                            <span className="font-bold">Estimated Cost:</span> $
                            {estimatedCost.toFixed(2)}
                        </p>
                        <p className="text-lg text-gray-800">
                            <span className="font-bold">Status:</span> Waiting
                            for driver to accept...
                        </p>
                    </div>
                )}
                {successMessage && (
                    <p className="text-green-500 mt-4">{successMessage}</p>
                )}
                {errorMessage && (
                    <p className="text-red-500 mt-4">{errorMessage}</p>
                )}
            </div>
        </div>
    );
};

export default BookingPage;
