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
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(
                'https://admin-service-olive.vercel.app/api/vehicles',
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
        }
    };

    const fetchVehicles = async () => {
        try {
            const response = await axios.get(
                'https://admin-service-olive.vercel.app/api/vehicles'
            );
            setVehicles(response.data);
        } catch (error) {
            setError('Failed to load vehicles.');
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

            const StatusMatch = filters.status
                ? vehicle.status === filters.status
                : true;
            return capacityMatch && typeMatch && StatusMatch;
        }
    );

    useEffect(() => {
        fetchVehicles();
    }, []);

    return (
        <div className="pt-12 my-10 ">
            <Heading text="Add Vehicle" />
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
            >
                <div className="mb-4">
                    <label className="block text-gray-700">Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
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
                <div className="mb-4">
                    <label className="block text-gray-700">License Plate</label>
                    <input
                        type="text"
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Capacity</label>
                    <select
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
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
                    className="bg-[#A9592C] text-white py-2 px-4 rounded hover:bg-opacity-90"
                >
                    Add Vehicle
                </button>
            </form>

            <div className="mt-10 max-w-7xl mx-auto">
                <Heading text="Existing Vehicles" />

                <div className="mb-4 flex lg:flex-row flex-col lg:mx-0 mx-4 gap-3 ">
                    <label className=" flex my-auto">Filter by Type:</label>
                    <select
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                        className="border p-2 rounded  "
                    >
                        <option value="">All</option>
                        <option value="SUV">SUV</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Truck">Truck</option>
                        <option value="Van">Van</option>
                        <option value="Motorcycle">Motorcycle</option>
                    </select>

                    <label className=" flex my-auto">Filter by Capacity:</label>
                    <input
                        type="number"
                        name="capacity"
                        value={filters.capacity}
                        onChange={handleFilterChange}
                        placeholder="Enter capacity"
                        className="border p-2 rounded"
                    />
                    <label className=" flex my-auto">Filter by Status:</label>
                    <select
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        className="border p-2 rounded"
                    >
                        <option value="">All</option>
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                        <option value="active">Active</option>
                    </select>
                </div>

                {filteredVehicles.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredVehicles.map((vehicle: any) => (
                            <li
                                key={vehicle.id}
                                className="p-4 bg-gray-100 rounded shadow"
                            >
                                <p>
                                    <strong>Type:</strong> {vehicle.type}
                                </p>
                                <p>
                                    <strong>License Plate:</strong>{' '}
                                    {vehicle.license_plate}
                                </p>
                                <p>
                                    <strong>Capacity:</strong>{' '}
                                    {vehicle.capacity}
                                </p>
                                <p>
                                    <strong>Status:</strong> {vehicle.status}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center font-bold text-xl my-8">
                        No vehicles found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AddVehicle;
