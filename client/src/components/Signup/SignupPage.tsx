'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/context/UserContext';
import bcrypt from 'bcryptjs';

const SignupPage = () => {
    const { setUser } = useUserContext();
    const [userType, setUserType] = useState<'user'>('user');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const requestBody: any = {
                name,
                email,
                password_hash: hashedPassword,
                role: userType,
            };

            if (userType === 'user') {
                requestBody.phone_number = phone;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BOOKING_SERVICE_URL}/api/signup`,
                // `http://localhost:5000/api/signup`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            const data = await response.json();
            console.log('Sign Up', data);

            if (response.ok) {
                setUser({ type: userType, email, id: data.data[0].id });
                router.push('/');
            } else {
                setError(data.message || 'Signup failed, please try again.');
            }
        } catch (err) {
            console.error(err);
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 flex flex-col items-center justify-center p-6">
            <h1
                className="text-3xl font-bold mb-6"
                style={{ color: '#A9592C' }}
            >
                Signup
            </h1>
            <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
                <div className="mb-6">
                    <label className="block text-black mb-2">
                        Select User Type
                    </label>
                    <select
                        value={userType}
                        onChange={(e) => setUserType(e.target.value as 'user')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="user">User</option>
                    </select>
                </div>

                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block text-black mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black mb-2">Email</label>
                        <input
                            type="email"
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

                    {userType === 'user' && (
                        <div className="mb-4">
                            <label className="block text-black mb-2">
                                Phone
                            </label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    )}

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <button className="w-full bg-[#A9592C] text-white py-2 rounded-md hover:bg-opacity-90">
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
