import { Router } from 'express';
import { createDriver, getAllDrivers } from '../controllers/driverController';

const router = Router();

router.post('/drivers', createDriver);
router.get('/drivers', getAllDrivers);

export default router;
