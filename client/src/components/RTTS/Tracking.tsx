'use client';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import car from '@/assets/car.png';
import { useUserContext } from '@/context/UserContext';

const vehicleIcon = new L.Icon({
    iconUrl: car.src,
    iconSize: [30, 40],
});

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

interface BookingDetails {
    vehicle: { type: string; plate_number: string; model: string };
    driver: { name: string; phone_number: string };
    status: 'pending' | 'On the way' | 'Arrived' | 'In transit';
    pickup_location: { formatted: string };
    dropoff_location: { formatted: string };
}

const TrackingPage = () => {
    const { user } = useUserContext();
    const [driverLocation, setDriverLocation] = useState<Location>({
        lat: 51.505,
        lng: -0.09,
    });
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(
                    'http://localhost:5000/api/bookings/getbookings',
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

    useEffect(() => {
        if (selectedBooking) {
            const interval = setInterval(() => {
                const newLat =
                    driverLocation.lat + (Math.random() - 0.5) * 0.001;
                const newLng =
                    driverLocation.lng + (Math.random() - 0.5) * 0.001;
                setDriverLocation({ lat: newLat, lng: newLng });
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [selectedBooking]);

    const handleBookingClick = async (booking: Booking) => {
        setSelectedBooking(booking);
        setDriverLocation({
            lat: booking.pickup_location.lat,
            lng: booking.pickup_location.lng,
        });

        try {
            const response = await fetch(
                'http://localhost:5000/api/bookings/getBookingDetails',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ booking_id: booking.id }),
                }
            );
            const details = await response.json();
            console.log(details);
            setBookingDetails(details);
        } catch (error) {
            console.error('Error fetching booking details:', error);

        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold mb-6" style={{ color: '#A9592C' }}>
                My Bookings
            </h1>

            {loading ? (
                <p className="text-gray-600">Loading bookings...</p>
            ) : (
                <ul className="w-full max-w-4xl mb-6 space-y-4">
                    {bookings.length > 0 &&
                        bookings.map((booking) => (
                            <li
                                key={booking.id}
                                className="p-4 border border-gray-300 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition"
                                onClick={() => handleBookingClick(booking)}
                            >
                                <h2 className="font-semibold text-lg text-gray-800">
                                    Booking ID: {booking.id}
                                </h2>
                                <p className="text-gray-600">Status: {booking.status}</p>
                                <p className="text-gray-600">Estimated Cost: ${booking.estimated_cost}</p>
                                <p className="text-gray-600">
                                    Pickup: {booking.pickup_location.formatted}
                                </p>
                                <p className="text-gray-600">
                                    Drop-off: {booking.dropoff_location.formatted}
                                </p>
                            </li>
                        ))}
                </ul>
            )}

            {selectedBooking && bookingDetails && (
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4 mb-6">
                    <h2 className="text-xl font-semibold text-black mb-2">
                        Driver: {bookingDetails.driver.name} (Phone: {bookingDetails.driver.phone_number})
                    </h2>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Vehicle Details</h3>
                    <p className="text-gray-600">Type: {bookingDetails.vehicle.type}</p>
                    <p className="text-gray-600">Plate Number: {bookingDetails.vehicle.plate_number}</p>
                    <p className="text-gray-600">Model: {bookingDetails.vehicle.model}</p>
                    <div className="h-80">
                        <MapContainer
                            center={driverLocation}
                            zoom={13}
                            scrollWheelZoom={false}
                            className="w-full h-full"
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={driverLocation} icon={vehicleIcon}></Marker>
                        </MapContainer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrackingPage;
