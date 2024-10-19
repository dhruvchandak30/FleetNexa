'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Heading from '../Utils/Heading';
import bcrypt from 'bcryptjs';

interface Driver {
    id?: number;
    name: string;
    email: string;
    password_hash: string;
    phone_number: string;
    vehicle_id?: number;
    status: string;
    created_at?: string;
    updated_at?: string;
    booking_number?: number;
    rating?: number;
}

const Drivers = () => {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [vehicleId, setVehicleId] = useState<number | undefined>(undefined);
    const [status, setStatus] = useState('available');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({ status: '' });

    const handleFilterChange = (e: any) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const filteredDrivers = drivers.filter((driver) => {
        return filters.status ? driver.status === filters.status : true;
    });

    const fetchDrivers = async () => {
        try {
            const response = await axios.get(
                'http://localhost:5001/api/drivers'
            );
            setDrivers(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch drivers. Please try again later.');
        }
    };

    const addDriver = async () => {
        if (!name || !email || !password || !phoneNumber || !status) {
            setError('Please fill in all required fields with valid values.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        setLoading(true);
        try {
            const driverData: Omit<Driver, 'id' | 'created_at' | 'updated_at'> =
                {
                    name,
                    email,
                    password_hash: hashedPassword,
                    phone_number: phoneNumber,
                    status,
                };
            await axios.post('http://localhost:5001/api/drivers', driverData);
            fetchDrivers();
            resetForm();
            setError('');
        } catch (err) {
            console.error(err);
            setError('Failed to add driver. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const deleteDriver = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5001/api/drivers/${id}`);
            fetchDrivers();
            setError('');
        } catch (err) {
            setError('Failed to delete driver. Please try again later.');
        }
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setPhoneNumber('');
        setVehicleId(undefined);
        setStatus('active');
        setError('');
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    return (
        <div className="bg-gray-50 p-8 pt-24 rounded-lg shadow-md">
            <div className="max-w-7xl mx-auto">
                <Heading text="Manage Drivers" />
                <p className="text-black mb-6">
                    Add new drivers and manage existing ones using the form
                    below.
                </p>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded mb-4">
                        {error}
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 p-3 rounded shadow-sm focus:outline-none focus:ring focus:ring-[#A9592C] focus:border-transparent"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 p-3 rounded shadow-sm focus:outline-none focus:ring focus:ring-[#A9592C] focus:border-transparent"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 p-3 rounded shadow-sm focus:outline-none focus:ring focus:ring-[#A9592C] focus:border-transparent"
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="border border-gray-300 p-3 rounded shadow-sm focus:outline-none focus:ring focus:ring-[#A9592C] focus:border-transparent"
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border border-gray-300 p-3 rounded shadow-sm focus:outline-none focus:ring focus:ring-[#A9592C] focus:border-transparent"
                    >
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                    </select>
                </div>
                <button
                    onClick={addDriver}
                    className="bg-[#A9592C] text-white p-3 rounded mt-4 hover:bg-opacity-90 shadow-md"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Driver'}
                </button>
                <h2 className="text-black text-xl mt-6 mb-4">
                    Existing Drivers
                </h2>
                <div className="mb-4">
                    <label className="mr-2">Filter by Status:</label>
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

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border border-gray-300 rounded-lg shadow-sm">
                    {filteredDrivers.map((driver) => (
                        <li
                            key={driver.id}
                            className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-md border border-gray-200"
                        >
                            <div className="flex flex-col mb-4">
                                <span className="text-black mb-2">
                                    <strong>Id:</strong> {driver.id}
                                </span>
                                <span className="text-black mb-2">
                                    <strong>Name:</strong> {driver.name}
                                </span>
                                <span className="text-black mb-2">
                                    <strong>Email:</strong> {driver.email}
                                </span>
                                <span className="text-black mb-2">
                                    <strong>Phone:</strong>{' '}
                                    {driver.phone_number}
                                </span>
                                <span className="text-black mb-2">
                                    <strong>Status:</strong> {driver.status}
                                </span>
                                <span className="text-black mb-2">
                                    <strong>Number of Bookings:</strong>{' '}
                                    {driver.booking_number}
                                </span>
                                <span className="text-black mb-2">
                                    <strong>Average Rating:</strong>{' '}
                                    {driver.rating}
                                </span>
                            </div>
                            <button
                                onClick={() => deleteDriver(driver.id!)}
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

export default Drivers;
