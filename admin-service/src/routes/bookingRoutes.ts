import { Router } from 'express';
import { createBooking, getAllBookings, updateBookingStatus } from '../controllers/bookingController';
import { getBookingById } from '../controllers/bookingController';

const router = Router();

router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.patch('/status', updateBookingStatus);

export default router;
