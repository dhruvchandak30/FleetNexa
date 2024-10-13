import { supabase } from '../config/supabaseClient';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const login = async (req: Request, res: Response) => {
    console.log(req.body);
    const { role, email, password } = req.body;

    if (!role || !email || !password) {
        return res
            .status(400)
            .json({ message: 'Role, email, and password are required.' });
    }

    try {
        let data;
        let error;

        if (role === 'admin') {
            ({ data, error } = await supabase
                .from('admins')
                .select('email, password_hash')
                .eq('email', email)
                .single());
        } else if (role === 'driver') {
            ({ data, error } = await supabase
                .from('drivers')
                .select('email, password_hash')
                .eq('email', email)
                .single());
        } else if (role === 'user') {
            ({ data, error } = await supabase
                .from('users')
                .select('email, password_hash')
                .eq('email', email)
                .single());
        }

        if (error || !data) {
            return res
                .status(401)
                .json({ message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, data.password_hash);
        if (!isMatch) {
            return res
                .status(401)
                .json({ message: 'Invalid email or password.' });
        }
        return res.status(200).json({
            message: `${role} logged in successfully!`,
            email: data.email,
        });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err });
    }
};

export default login;
