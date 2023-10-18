import express from 'express';
import { register, handleLogin } from '../controller/userController.js';
import handleRefreshToken  from '../controller/refreshControler.js';
import {forgetPasswordHandler} from '../controller/authController.js';
import {resetPasswordHandler} from '../controller/authController.js';

const router = express.Router();
router.get('/register',  register);
router.post('/login', handleLogin);
router.post('/refresh-token', handleRefreshToken);
router.post('/forget-password', forgetPasswordHandler);
router.patch('/reset-password/:resetToken', resetPasswordHandler);

export default router;