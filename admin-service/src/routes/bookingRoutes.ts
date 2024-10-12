import { Router } from 'express';
import { createBooking, getAllBookings } from '../controllers/bookingController';

const router = Router();

router.post('/book', createBooking);
router.get('/', getAllBookings);

export default router;
