import { Router } from 'express';
import { createBooking, getAllBookings } from '../controllers/bookingController';

const router = Router();

router.post('/', createBooking);
router.get('/', getAllBookings);

export default router;
