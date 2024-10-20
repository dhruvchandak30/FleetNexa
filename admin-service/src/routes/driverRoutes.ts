import { Router } from 'express';
import { createDriver, getAllDrivers, deleteDriver, updateDriverStatus } from '../controllers/driverController';

const router = Router();

router.post('/', createDriver);
router.get('/', getAllDrivers);
router.delete('/:id', deleteDriver);
router.patch('/:id', updateDriverStatus);

export default router;
