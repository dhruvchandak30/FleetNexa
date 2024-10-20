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
    rating?: number;
}

const TrackingPage = () => {
    const { user } = useUserContext();
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [rating, setRating] = useState<{ [key: string]: number }>({});

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

                const initialRatingState: { [key: string]: number } = {};
                data.forEach((booking: Booking) => {
                    if (booking.rating) {
                        initialRatingState[booking.id] = booking.rating;
                    }
                });
                setRating(initialRatingState);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user?.id]);

    const handleBookingClick = (booking: Booking) => {
        if (booking.status !== 'Arrived') {
            router.push(`/trackparcel/${booking.id}`);
        }
    };

    const handleRatingSubmit = async (bookingId: string) => {
        console.log(bookingId);
        const selectedRating = rating[bookingId];
        if (!selectedRating) {
            setErrorMessage('Please select a rating before submitting.');
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BOOKING_SERVICE_URL}/api/bookings/rate`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        bookingId: bookingId,
                        rating: selectedRating,
                    }),
                }
            );
            if (response.ok) {
                setSuccessMessage('Thank you for your rating!');
                setErrorMessage('');
                setRating((prev) => ({
                    ...prev,
                    [bookingId]: selectedRating,
                }));
            } else {
                throw new Error('Failed to submit rating.');
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
            setErrorMessage('Error submitting rating. Please try again.');
        }
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
                        bookings
                            .slice()
                            .sort((a, b) => b.estimated_cost - a.estimated_cost)
                            .map((booking) => (
                                <li
                                    key={booking.id}
                                    className="p-5 border-2 border-[#A9592C] rounded-xl shadow-lg cursor-pointer hover:bg-opacity-10 transition-all hover:shadow-xl"
                                    onClick={() => handleBookingClick(booking)}
                                >
                                    <p
                                        className={`text-gray-800 ${
                                            booking.status === 'pending'
                                                ? 'text-red-600'
                                                : booking.status ===
                                                  'On the way'
                                                ? 'text-yellow-600'
                                                : booking.status ===
                                                      'Arrived' ||
                                                  booking.status ===
                                                      'In transit'
                                                ? 'text-green-600'
                                                : ''
                                        }`}
                                    >
                                        <strong>Status:</strong>{' '}
                                        {booking.status
                                            .charAt(0)
                                            .toUpperCase() +
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

                                    {booking.status === 'Arrived' && (
                                        <div className="mt-4">
                                            <p className="text-gray-800">
                                                <strong>
                                                    Rate the Driver:
                                                </strong>
                                            </p>
                                            <div className="flex space-x-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        className={`text-2xl cursor-pointer ${
                                                            star <=
                                                            (rating[
                                                                booking.id
                                                            ] || 0)
                                                                ? 'text-yellow-400'
                                                                : 'text-gray-300'
                                                        }`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setRating(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [booking.id]:
                                                                        star,
                                                                })
                                                            );
                                                        }}
                                                    >
                                                        ★
                                                    </button>
                                                ))}
                                            </div>
                                            <button
                                                className="mt-2 bg-[#A9592C] text-white px-4 py-2 rounded"
                                                onClick={() =>
                                                    handleRatingSubmit(
                                                        booking.id
                                                    )
                                                }
                                            >
                                                Submit Rating
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ))}
                </ul>
            )}

            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            {successMessage && (
                <p className="text-green-600">{successMessage}</p>
            )}
        </div>
    );
};

export default TrackingPage;
