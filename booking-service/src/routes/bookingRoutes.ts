import { Router, Request, Response } from 'express';
import { createBooking, getBookings, getBookingById } from '../controllers/bookingController';

const router = Router();
//@ts-ignore
router.post('/', createBooking);
//@ts-ignore
router.post('/getbookings', getBookings);
//@ts-ignore
router.post('/getBookingDetails', getBookingById);

export default router;
