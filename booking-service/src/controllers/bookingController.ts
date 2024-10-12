import { Request, Response } from 'express';
import * as bookingService from '../services/bookingService';

export const createBooking = async (req: Request, res: Response): Promise<Response> => {
    try {
        const bookingData = await bookingService.createBooking(req.body);
        return res.status(201).json({ message: 'Booking created', data: bookingData });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'An unknown error occurred' });
    }
};
