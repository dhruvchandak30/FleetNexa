'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Heading from '../Utils/Heading';

const AddVehicle: React.FC = () => {
    const [type, setType] = useState('');
    const [licensePlate, setLicensePlate] = useState(''); 
    const [capacity, setCapacity] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5001/api/vehicles', {
                type,
                license_plate: licensePlate, 
                capacity,
            });

            if (response.status === 201) {
                setSuccess('Vehicle added successfully!');
                setType('');
                setLicensePlate('');
                setCapacity('');
            }
        } catch (error) {
            setError('Failed to add vehicle. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 p-6 pt-12 bg-white rounded-lg shadow-md">
            <Heading text="Add Vehicle" />
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    >
                        <option value="" disabled>Select vehicle type</option>
                        <option value="SUV">SUV</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Truck">Truck</option>
                        <option value="Van">Van</option>
                        <option value="Motorcycle">Motorcycle</option>
                        <option value="Pickup">Pickup</option>
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
                        <option value="" disabled>Select capacity (seats)</option>
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
        </div>
    );
};

export default AddVehicle;
