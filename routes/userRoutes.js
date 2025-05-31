import express from 'express';
import { deleteUserController, getUserController, resetPasswordCoontroller, updatePasswordController, updateProfileController } from '../controllers/userController.js'; // ✅ no space
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET user || GET
router.get('/getUser', authMiddleware, getUserController);

// UPDATE PROFILE || PUT
router.put('/updateUser', authMiddleware, updateProfileController);
// reset password || POST
router.post('/resetPassword', authMiddleware, resetPasswordCoontroller);
// update password || POST
router.post('/updatePassword', authMiddleware, updatePasswordController);
// Delete user || DELETE
router.delete('/deleteUser/:id', authMiddleware, deleteUserController);

// Temporary test route to verify route setup
router.get('/test', (req, res) => {
    res.send("✅ Auth routes are working!");
});

export default router;
