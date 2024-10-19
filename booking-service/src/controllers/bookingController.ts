import { Request, Response } from 'express';
import * as bookingService from '../services/bookingService';

export const createBooking = async (req: Request, res: Response): Promise<Response> => {
    try {
        const bookingData = await bookingService.createBookingWithDriverAndVehicle(req.body);
        return res.status(201).json({ message: 'Booking created', data: bookingData });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'An unknown error occurred' });
    }
};

export const getBookings = async (req: Request, res: Response): Promise<Response> => {
    try {
        const bookings = await bookingService.getBookingsByUserId(req.body.user_id);
        return res.status(200).json(bookings);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'An unknown error occurred' });
    }
};

export const getBookingById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const booking = await bookingService.getBookingById(req.body.booking_id);
        return res.status(200).json(booking);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'An unknown error occurred' });
    }
}

export const getDriverBookings = async (req: Request, res: Response): Promise<Response> => {
    try {
        const bookings = await bookingService.getDriverBookings(req.body.driver_id);
        return res.status(200).json({ bookings });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'An unknown error occurred' });
    }
}

export const acceptBooking = async (req: Request, res: Response): Promise<Response> => {
    try {
        await bookingService.acceptBooking(req.body.booking_id);
        return res.status(200).json({ message: 'Booking accepted' });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'An unknown error occurred' });
    }
}

export const updateBookingStatus = async (req: Request, res: Response): Promise<Response> => {
    try {
        await bookingService.updateBookingStatus(req.body.booking_id, req.body.status);
        return res.status(200).json({ message: 'Booking status updated' });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'An unknown error occurred' });
    }
}