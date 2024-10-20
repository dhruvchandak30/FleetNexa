import { Router } from 'express';
import { createVehicle, getAllVehicles, updateVehicleStatus } from '../controllers/vehicleController';

const router = Router();

router.post('/', createVehicle);
router.get('/', getAllVehicles);
router.patch('/:id', updateVehicleStatus);

export default router;
