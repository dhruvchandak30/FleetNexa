import { Router, Request, Response } from 'express';
import { createBooking } from '../controllers/bookingController';

const router = Router();
//@ts-ignore
router.post('/book', createBooking); 

export default router;
