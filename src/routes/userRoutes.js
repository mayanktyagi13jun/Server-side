import express from 'express';
import { register, handleLogin } from '../controller/userController.js';
import handleRefreshToken  from '../controller/refreshControler.js';

const router = express.Router();
router.get('/register',  register);
router.post('/login', handleLogin);
router.post('/refresh-token', handleRefreshToken);

export default router;