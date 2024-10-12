'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Heading from '../Utils/Heading';

interface Driver {
    id?: number;
    name: string;
    email: string;
    passwordHash: string;
    phoneNumber: string;
    vehicleId?: number;
    status: string;
}

const Drivers = () => {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchDrivers = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/drivers');
            setDrivers(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch drivers. Please try again later.');
        }
    };

    const addDriver = async () => {
        // Validation checks
        if (!name || !email || !phoneNumber) {
            setError('Please fill in all fields with valid values.');
            return;
        }

        // Simple email format validation (can be improved further)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Optional: Add more validation for phone number if needed

        setLoading(true);
        try {
            const driverData: Driver = {
                name,
                email,
                passwordHash: 'hashed_password',
                phoneNumber,
                status: 'active',
            };
            await axios.post('http://localhost:5001/api/drivers', driverData);
            fetchDrivers();
            resetForm();
            setError('');
        } catch (err) {
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
        setPhoneNumber('');
        setError(''); // Clear any existing error when resetting the form
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    return (
        <div className="bg-gray-50 p-8 pt-24 rounded-lg shadow-md">
            <div className="max-w-7xl mx-auto">
                <Heading text="Manage Drivers" />
                <p className="text-black mb-6">
                    Add new drivers and manage existing ones using the form below.
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
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="border border-gray-300 p-3 rounded shadow-sm focus:outline-none focus:ring focus:ring-[#A9592C] focus:border-transparent"
                    />
                </div>
                <button
                    onClick={addDriver}
                    className="bg-[#A9592C] text-white p-3 rounded mt-4 hover:bg-opacity-90 shadow-md"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Driver'}
                </button>
                <h2 className="text-black text-xl mt-6 mb-4">Existing Drivers</h2>
                <ul className="border border-gray-300 rounded-lg shadow-sm">
                    {drivers.map((driver) => (
                        <li
                            key={driver.id}
                            className="flex justify-between items-center p-4 border-b last:border-b-0"
                        >
                            <span className="text-black">{driver.name}</span>
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
