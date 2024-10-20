'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Heading from '../Utils/Heading';

const AddVehicle: React.FC = () => {
    const [type, setType] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [capacity, setCapacity] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_ADMIN_SERVICE_URL}/api/vehicles`,
                {
                    type,
                    license_plate: licensePlate,
                    capacity,
                }
            );

            if (response.status === 201) {
                setSuccess('Vehicle added successfully!');
                setType('');
                setLicensePlate('');
                setCapacity('');
                fetchVehicles();
            }
        } catch (error) {
            setError('Failed to add vehicle. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchVehicles = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_ADMIN_SERVICE_URL}/api/vehicles`
            );
            setVehicles(response.data);
        } catch (error) {
            setError('Failed to load vehicles.');
        }
    };

    const toggleAvailability = async (vehicle: any) => {
        try {
            const newStatus =
                vehicle.status === 'available' ? 'unavailable' : 'available';
            await axios.patch(
                `${process.env.NEXT_PUBLIC_ADMIN_SERVICE_URL}/api/vehicles/${vehicle.id}`,
                { status: newStatus }
            );
            fetchVehicles();
        } catch (error) {
            setError('Failed to update vehicle status.');
        }
    };

    const [filters, setFilters] = useState({
        capacity: '',
        type: '',
        status: '',
    });

    const handleFilterChange = (e: any) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const filteredVehicles = vehicles.filter(
        (vehicle: { capacity: string; type: string; status: string }) => {
            const capacityMatch = filters.capacity
                ? vehicle.capacity.toString() === filters.capacity
                : true;
            const typeMatch = filters.type
                ? vehicle.type === filters.type
                : true;
            const statusMatch = filters.status
                ? vehicle.status === filters.status
                : true;
            return capacityMatch && typeMatch && statusMatch;
        }
    );

    useEffect(() => {
        fetchVehicles();
    }, []);

    return (
        <div className="pt-12 my-10 px-4 md:px-8 lg:px-16">
            <Heading text="Add Vehicle" />
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}

            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md space-y-6"
            >
                <div className="space-y-1">
                    <label className="block text-gray-700">Vehicle Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="" disabled>
                            Select vehicle type
                        </option>
                        <option value="SUV">SUV</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Truck">Truck</option>
                        <option value="Van">Van</option>
                        <option value="Motorcycle">Motorcycle</option>
                    </select>
                </div>
                <div className="space-y-1">
                    <label className="block text-gray-700">License Plate</label>
                    <input
                        type="text"
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="space-y-1">
                    <label className="block text-gray-700">Capacity</label>
                    <select
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="" disabled>
                            Select capacity (seats)
                        </option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#A9592C] text-white py-2 rounded hover:bg-opacity-90"
                >
                    {loading ? 'Adding Vehicle...' : 'Add Vehicle'}
                </button>
            </form>

            <div className="mt-10 max-w-7xl mx-auto">
                <Heading text="Existing Vehicles" />

                <div className="mb-4 flex flex-col lg:flex-row gap-4 lg:gap-6">
                    <div className="space-y-1">
                        <label className="block text-gray-700">
                            Filter by Type
                        </label>
                        <select
                            name="type"
                            value={filters.type}
                            onChange={handleFilterChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">All</option>
                            <option value="SUV">SUV</option>
                            <option value="Sedan">Sedan</option>
                            <option value="Truck">Truck</option>
                            <option value="Van">Van</option>
                            <option value="Motorcycle">Motorcycle</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="block text-gray-700">
                            Filter by Capacity
                        </label>
                        <input
                            type="number"
                            name="capacity"
                            value={filters.capacity}
                            onChange={handleFilterChange}
                            placeholder="Enter capacity"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-gray-700">
                            Filter by Status
                        </label>
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">All</option>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                            <option value="active">Active</option>
                        </select>
                    </div>
                </div>

                {filteredVehicles.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredVehicles.map((vehicle: any) => (
                            <li
                                key={vehicle.id}
                                className="p-6 bg-white rounded-lg shadow"
                            >
                                <p>
                                    <strong>Type: </strong> {vehicle.type}
                                </p>
                                <p>
                                    <strong>License Plate: </strong>{' '}
                                    {vehicle.license_plate}
                                </p>
                                <p>
                                    <strong>Capacity: </strong>{' '}
                                    {vehicle.capacity}
                                </p>
                                <p>
                                    <strong>Status: </strong> 
                                    <span
                                        className={`${
                                            vehicle.status === 'active'
                                                ? 'text-yellow-500'
                                                : vehicle.status === 'available'
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                        }`}
                                    >
                                        {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                                    </span>
                                </p>
                                {vehicle.status !== 'active' && (
                                    <button
                                        onClick={() =>
                                            toggleAvailability(vehicle)
                                        }
                                        className={`mt-4 w-full py-2 rounded text-white ${
                                            vehicle.status === 'available'
                                                ? 'bg-red-500 hover:bg-red-400'
                                                : 'bg-green-500 hover:bg-green-400'
                                        }`}
                                    >
                                        {vehicle.status === 'available'
                                            ? 'Make Unavailable'
                                            : 'Make Available'}
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-xl font-bold my-8">
                        No vehicles found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AddVehicle;
