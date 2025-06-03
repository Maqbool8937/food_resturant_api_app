
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createResturantController, deleteResturantController, getAllResturantController, getResturantByIdController, } from '../controllers/resturantController.js';


const router = express.Router();

// Resturant Api CRUD OPERATIONS:

// create resturant routes || POST
router.post('/create', authMiddleware, createResturantController);

// GET ALL RESTURANTS ROUTES || GET
router.get('/getAll', getAllResturantController);
// GET RESTURANT BY ID ROUTES || GET
router.get('/get/:id', getResturantByIdController);
// DELETE RESTURANT || DELETE
router.delete('/delete/:id', authMiddleware, deleteResturantController);

export default router;
