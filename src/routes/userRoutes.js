import express from 'express';
import { register, handleLogin } from '../controller/userController.js';

const router = express.Router();
router.get('/register',  register);
router.post('/login', handleLogin);

export default router;