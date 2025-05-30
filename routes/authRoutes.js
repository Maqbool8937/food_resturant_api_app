import express from 'express';
import { loginController, registerController } from '../controllers/authController.js';

const router = express.Router();

// @route   POST /api/v1/auth/register
// @desc    Register a new user
router.post('/register', registerController);

// @route   POST /api/v1/auth/login
// @desc    Login an existing user
router.post('/login', loginController);

// Temporary test route to verify route setup
router.get('/test', (req, res) => {
    res.send("✅ Auth routes are working!");
});

export default router;
