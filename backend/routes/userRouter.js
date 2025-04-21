import express from 'express';
import { login,logout,register,getUser } from '../controllers/userController.js';
import { isAuthorized } from '../middleware/auth.js';
const router= express.Router();



router.post('/login', login);
router.post('/register', register);
router.get('/logout', isAuthorized, logout);
router.get('/getUser', isAuthorized, getUser);
export default router;