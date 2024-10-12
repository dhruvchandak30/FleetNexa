'use client';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import car from '@/assets/car.png';

const vehicleIcon = new L.Icon({
    iconUrl: car.src,
    iconSize: [30, 40],
});

interface Location {
    lat: number;
    lng: number;
}

const TrackingPage = () => {
    const [driverLocation, setDriverLocation] = useState<Location>({
        lat: 51.505,
        lng: -0.09,
    });
    const [status, setStatus] = useState<
        'On the way' | 'Arrived' | 'In transit'
    >('On the way');

    useEffect(() => {
        const interval = setInterval(() => {
            const newLat = driverLocation.lat + (Math.random() - 0.5) * 0.001;
            const newLng = driverLocation.lng + (Math.random() - 0.5) * 0.001;
            setDriverLocation({ lat: newLat, lng: newLng });

            const statusOptions: ('On the way' | 'Arrived' | 'In transit')[] = [
                'On the way',
                'Arrived',
                'In transit',
            ];
            setStatus(
                statusOptions[Math.floor(Math.random() * statusOptions.length)]
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [driverLocation]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <h1
                className="text-3xl font-bold mb-6"
                style={{ color: '#A9592C' }}
            >
                Real-Time Vehicle Tracking
            </h1>
            <div className="w-full max-w-4xl h-96 bg-white rounded-lg shadow-md p-4">
                <MapContainer
                    center={driverLocation}
                    zoom={13}
                    scrollWheelZoom={false}
                    className="w-full h-full"
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker
                        position={driverLocation}
                        icon={vehicleIcon}
                    ></Marker>
                </MapContainer>
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-black">
                    Driver Status:{' '}
                    <span className="text-[#A9592C]">{status}</span>
                </h2>
            </div>
        </div>
    );
};

export default TrackingPage;
