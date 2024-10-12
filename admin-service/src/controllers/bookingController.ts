import { NextFunction, Request, Response } from 'express';
import * as bookingService from '../services/bookingService';

export const createBooking = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const bookingData = await bookingService.createBooking(req.body);
        res
            .status(201)
            .json({ message: 'Booking created', data: bookingData });
    } catch (error) {
        res.status(400).json({ error: 'Error creating booking' });
    }
};

export const getAllBookings = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const bookings = await bookingService.getAllBookings();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching bookings' });
    }
};
