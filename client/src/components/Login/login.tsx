'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/context/UserContext';
import bcrypt from 'bcryptjs';
const LoginSignupPage = () => {
    const { setUser } = useUserContext();
    const [userType, setUserType] = useState<'user' | 'driver' | 'admin'>(
        'user'
    );
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
    

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BOOKING_SERVICE_URL}/api/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        role: userType,
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                setUser({ type: userType, email, id: data.id });
                router.push('/');
            } else {
                setError(
                    data.message ||
                        'Login failed, please check your credentials.'
                );
            }
        } catch (err) {
            console.error(err);
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <h1
                className="text-3xl font-bold mb-6"
                style={{ color: '#A9592C' }}
            >
                Login
            </h1>
            <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
                <div className="mb-6">
                    <label className="block text-black mb-2">
                        Select User Type
                    </label>
                    <select
                        value={userType}
                        onChange={(e) =>
                            setUserType(
                                e.target.value as 'user' | 'driver' | 'admin'
                            )
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="user">User</option>
                        <option value="driver">Driver</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-black mb-2">
                            {userType === 'user'
                                ? 'Email'
                                : userType === 'driver'
                                ? 'Driver ID'
                                : 'Admin Code'}
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <button className="w-full bg-[#A9592C] text-white py-2 rounded-md hover:bg-opacity-90">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginSignupPage;
