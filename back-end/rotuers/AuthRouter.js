import express from 'express';
import { forgotPassword, resetPassword, signIn, signUp } from '../controllers/AuthController.js';


export const AuthRouter = express.Router()

AuthRouter.post('/users/sign-up', signUp);
AuthRouter.post('/users/sign-in', signIn);
AuthRouter.post('/users/forgot-password', forgotPassword);
AuthRouter.put('/users/reset-password/:id/:token', resetPassword);