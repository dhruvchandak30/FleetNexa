'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import car from '@/assets/car.png';
import endLocation from '@/assets/endLocation.png';
import start_location from '@/assets/start_location.png';

const vehicleIcon = new L.Icon({
    iconUrl: car.src,
    iconSize: [30, 40],
});

const endLocationIcon = new L.Icon({
    iconUrl: endLocation.src,
    iconSize: [30, 40],
});

const startLocationIcon = new L.Icon({
    iconUrl: start_location.src,
    iconSize: [30, 40],
});

interface BookingDetails {
    booking: {
        pickup_location: { lat: number; lng: number; formatted: string };
        dropoff_location: { lat: number; lng: number; formatted: string };
        status: 'pending' | 'On the way' | 'Arrived' | 'In transit';
    };
    driver: {
        name: string;
        phone_number: string;
    };
    vehicle: {
        type: string;
        license_plate: string;
    };
}

interface TrackingParcelProps {
    id: string;
}

const TrackingParcel = ({ id }: TrackingParcelProps) => {
    const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
        null
    );
    const [driverLocation, setDriverLocation] = useState({
        lat: 21.1339435,
        lng: 79.0805662,
    });

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
                    console.log('Booking Details:', details);
                    setBookingDetails(details);
                    if (details.booking && details.booking.pickup_location) {
                        setDriverLocation({
                            lat: details.booking.pickup_location.lat,
                            lng: details.booking.pickup_location.lng,
                        });
                    }
                } catch (error) {
                    console.error('Error fetching booking details:', error);
                }
            };

            fetchBookingDetails();
        }
    }, [id]);

    useEffect(() => {
        if (bookingDetails) {
            const pickupLocation = bookingDetails.booking.pickup_location;
            const dropoffLocation = bookingDetails.booking.dropoff_location;

            const map = L.map('map').setView(driverLocation, 10);
            L.tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            ).addTo(map);
            //@ts-ignore
            const routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(pickupLocation.lat, pickupLocation.lng),
                    L.latLng(dropoffLocation.lat, dropoffLocation.lng),
                ],
                routeWhileDragging: true,
                createMarker: () => null,
                show: false,
                instructions: false,
            }).addTo(map);

            L.marker([pickupLocation.lat, pickupLocation.lng], {
                icon: startLocationIcon,
            }).addTo(map);
            L.marker([dropoffLocation.lat, dropoffLocation.lng], {
                icon: endLocationIcon,
            }).addTo(map);

            return () => {
                map.removeControl(routingControl);
                map.remove();
            };
        }
    }, [bookingDetails]);

    if (!bookingDetails) return <p>Loading booking details...</p>;

    const pickupLocation = bookingDetails.booking.pickup_location;
    const dropoffLocation = bookingDetails.booking.dropoff_location;

    if (!pickupLocation || !dropoffLocation)
        return <p>Invalid booking details.</p>;

    return (
        <div className="p-6 pt-12 my-12 bg-gradient-to-br from-[#d2eae5] to-[#ead9ce] rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row justify-between mb-6 border p-4 rounded-md shadow-lg bg-white">
                <div className="md:w-1/3 mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold text-[#A9592C]">
                        Driver Details
                    </h3>
                    <p className="text-gray-700">
                        <span className="font-semibold">Name:</span>{' '}
                        {bookingDetails.driver.name}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Phone:</span>{' '}
                        {bookingDetails.driver.phone_number}
                    </p>
                </div>
                <div className="md:w-1/3 mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold text-[#A9592C]">
                        Vehicle Details
                    </h3>
                    <p className="text-gray-700">
                        <span className="font-semibold">Model:</span>{' '}
                        {bookingDetails.vehicle.type}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Number Plate:</span>{' '}
                        {bookingDetails.vehicle.license_plate}
                    </p>
                </div>
                <div className="md:w-1/3">
                    <h3 className="text-lg font-semibold text-[#A9592C]">
                        Journey Details
                    </h3>
                    <p className="text-gray-700">
                        <span className="font-semibold">Starting Point:</span>{' '}
                        {pickupLocation.formatted}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Ending Point:</span>{' '}
                        {dropoffLocation.formatted}
                    </p>
                </div>
            </div>
            <div
                className="h-96 mt-6 rounded-lg overflow-hidden shadow-sm"
                id="map"
            ></div>
        </div>
    );
};

export default TrackingParcel;
