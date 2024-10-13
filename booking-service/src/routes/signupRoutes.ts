import { Router } from 'express';
import signup from '../services/signupService';

const router = Router();
//@ts-ignore
router.post('/', signup);

export default router;
