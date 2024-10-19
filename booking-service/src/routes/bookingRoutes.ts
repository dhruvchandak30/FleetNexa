import { Router, Request, Response } from 'express';
import {
    createBooking,
    getBookings,
    getBookingById,
    getDriverBookings,
    acceptBooking,
    updateBookingStatus,
} from '../controllers/bookingController';

const router = Router();
//@ts-ignore
router.post('/', createBooking);
//@ts-ignore
router.post('/getbookings', getBookings);
//@ts-ignore
router.post('/getBookingDetails', getBookingById);
//@ts-ignore
router.post('/getDriverBookings', getDriverBookings);
//@ts-ignore
router.post('/acceptBooking', acceptBooking);
//@ts-ignore
router.post('/updateBookingStatus', updateBookingStatus);

export default router;
