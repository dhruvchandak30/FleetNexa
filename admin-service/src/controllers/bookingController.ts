import { NextFunction, Request, Response } from 'express';
import * as bookingService from '../services/bookingService';

export const createBooking = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const bookingData = await bookingService.createBooking(req.body);
        res.status(201).json({ message: 'Booking created', data: bookingData });
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
        console.log(error);
        res.status(400).json({ error: 'Error fetching bookings' + error });
    }
};

export const getBookingById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const bookingId = req.params.id;
        console.log('Booking Id', bookingId);
        const booking = await bookingService.getBookingById(bookingId);
        if (booking) {
            res.status(200).json(booking);
        } else {
            res.status(404).json({ error: 'Booking not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error fetching booking' });
    }
};

export const updateBookingStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id, status } = req.body;
        console.log("Got Booking Status", id, status);
        if (!id || !status) {
            res.status(400).json({
                error: 'Missing required parameters: id or status',
            });
            return;
        }

        const updatedBooking = await bookingService.updateBookingStatus(
            id,
            status
        );

        if (updatedBooking) {
            res.status(200).json({
                message: 'Booking status updated successfully',
                data: updatedBooking,
            });
        } else {
            res.status(404).json({ error: 'Booking not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error updating booking status' });
    }
};
