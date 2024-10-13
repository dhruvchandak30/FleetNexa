import { Router } from 'express';
import { createDriver, getAllDrivers } from '../controllers/driverController';

const router = Router();

router.post('/', createDriver);
router.get('/', getAllDrivers);

export default router;
