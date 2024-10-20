'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import car from '@/assets/car.png';
import start_location from '@/assets/start_location.png';
import endLocation from '@/assets/endLocation.png';

const vehicleIcon = new L.Icon({
    iconUrl: car.src,
    iconSize: [30, 40],
});

const startLocationIcon = new L.Icon({
    iconUrl: start_location.src,
    iconSize: [30, 40],
});

const endLocationIcon = new L.Icon({
    iconUrl: endLocation.src,
    iconSize: [30, 40],
});

interface BookingDetails {
    pickup_location: { lat: number; lng: number; formatted: string };
    dropoff_location: { lat: number; lng: number; formatted: string };
    estimated_cost: number; // Added to hold the estimated cost
}

interface GetParcelProps {
    id: string;
}

const GetParcel = ({ id }: GetParcelProps) => {
    const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
        null
    );
    const [driverLocation, setDriverLocation] = useState<{
        lat: number;
        lng: number;
    } | null>(null);
    const [showDropoff, setShowDropoff] = useState(false);
    const [parcelCollected, setParcelCollected] = useState(false);
    const [parcelDelivered, setParcelDelivered] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchBookingDetails = async () => {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BOOKING_SERVICE_URL}/api/bookings/getBookingDetails`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ booking_id: id }),
                        }
                    );
                    const details = await response.json();
                    setBookingDetails(details.booking);
                } catch (error) {
                    console.error('Error fetching booking details:', error);
                }
            };

            fetchBookingDetails();
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setDriverLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error('Error fetching driver location:', error);
                }
            );
        }
    }, [id]);

    useEffect(() => {
        if (bookingDetails && driverLocation) {
            const pickupLocation = bookingDetails.pickup_location;
            const dropoffLocation = bookingDetails.dropoff_location;

            const map = L.map('map').setView(driverLocation, 10);
            L.tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            ).addTo(map);

            const waypoints = [
                L.latLng(driverLocation.lat, driverLocation.lng),
                L.latLng(pickupLocation.lat, pickupLocation.lng),
            ];

            if (showDropoff) {
                waypoints.push(
                    L.latLng(dropoffLocation.lat, dropoffLocation.lng)
                );
            }
            //@ts-ignore
            L.Routing.control({
                waypoints,
                routeWhileDragging: true,
                createMarker: () => null,
                show: false,
                instructions: false,
            }).addTo(map);

            L.marker([driverLocation.lat, driverLocation.lng], {
                icon: vehicleIcon,
            }).addTo(map);
            L.marker([pickupLocation.lat, pickupLocation.lng], {
                icon: startLocationIcon,
            }).addTo(map);

            if (showDropoff) {
                L.marker([dropoffLocation.lat, dropoffLocation.lng], {
                    icon: endLocationIcon,
                }).addTo(map);
            }

            return () => {
                map.remove();
            };
        }
    }, [bookingDetails, driverLocation, showDropoff]);

    const handleParcelCollected = async () => {
        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_BOOKING_SERVICE_URL}/api/bookings/updateBookingStatus`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        booking_id: id,
                        status: 'In transit',
                    }),
                }
            );
            setParcelCollected(true);
            setShowDropoff(true);
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
    };

    const handleParcelDelivered = async () => {
        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_BOOKING_SERVICE_URL}/api/bookings/updateBookingStatus`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ booking_id: id, status: 'Arrived' }),
                }
            );
            setParcelDelivered(true);
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
    };

    if (!bookingDetails || !driverLocation)
        return <p>Loading parcel details...</p>;

    const pickupLocation = bookingDetails.pickup_location;
    const dropoffLocation = bookingDetails.dropoff_location;

    return (
        <div className="p-6 pt-12 my-12 bg-gradient-to-br from-[#d2eae5] to-[#ead9ce] rounded-lg shadow-md">
            {parcelDelivered ? (
                <div className="text-center h-screen">
                    <h2 className="text-2xl font-semibold text-[#A9592C]">
                        Successfully Delivered!
                    </h2>
                    <p className="text-gray-700 text-lg">
                        {bookingDetails.estimated_cost}Rs has been credited to
                        your account.
                    </p>
                    <p>Thank You!!</p>
                </div>
            ) : (
                <>
                    <div className="flex flex-col md:flex-row justify-between mb-6 border p-4 rounded-md shadow-lg bg-white">
                        <div className="md:w-1/3 mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold text-[#A9592C]">
                                Pickup Location
                            </h3>
                            <p className="text-gray-700">
                                <span className="font-semibold">Address:</span>{' '}
                                {pickupLocation.formatted}
                            </p>
                        </div>
                        <div className="md:w-1/3 mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold text-[#A9592C]">
                                Dropoff Location
                            </h3>
                            <p className="text-gray-700">
                                <span className="font-semibold">Address:</span>{' '}
                                {dropoffLocation.formatted}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center mb-4">
                        {!parcelCollected ? (
                            <button
                                className="px-4 py-2 text-white bg-[#A9592C] rounded hover:bg-[#8A4D26]"
                                onClick={handleParcelCollected}
                            >
                                Parcel Collected
                            </button>
                        ) : (
                            <button
                                className="px-4 py-2 text-white bg-[#A9592C] rounded hover:bg-[#8A4D26]"
                                onClick={handleParcelDelivered}
                            >
                                Parcel Delivered
                            </button>
                        )}
                    </div>
                    <div
                        className="h-96 mt-6 rounded-lg overflow-hidden shadow-sm"
                        id="map"
                    ></div>
                </>
            )}
        </div>
    );
};

export default GetParcel;
