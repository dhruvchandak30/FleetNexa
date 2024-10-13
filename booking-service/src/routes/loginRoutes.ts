import { Router } from 'express';
import login from '../services/loginService';

const router = Router();
//@ts-ignore
router.post('/', login);

export default router;
