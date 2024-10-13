import { supabase } from '../config/supabaseClient';
import { Request, Response } from 'express';

const signup = async (req: Request, res: Response) => {
    const { name, email, password_hash, phone_number, role } = req.body;

    if (!name || !email || !password_hash) {
        return res
            .status(400)
            .json({ message: 'Name, email, and password are required.' });
    }

    try {
        if (role === 'admin') {
            const { data, error } = await supabase
                .from('admins')
                .insert([{ name, email, password_hash }]);

            if (error) {
                return res
                    .status(500)
                    .json({ message: 'Error adding admin', error });
            }
            return res
                .status(201)
                .json({ message: 'Admin registered successfully', data });
        } else {
            const { data, error } = await supabase
                .from('users')
                .insert([{ name, email, password_hash, phone_number }]);

            if (error) {
                return res
                    .status(500)
                    .json({ message: 'Error adding user', error });
            }
            return res
                .status(201)
                .json({ message: 'User registered successfully', data });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err });
    }
};

export default signup;
