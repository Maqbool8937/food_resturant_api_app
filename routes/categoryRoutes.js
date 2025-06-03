
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createCategoryController, deleteCategoryController, getAllCategoriesController, updateCategoryController } from '../controllers/categoryController.js';


const router = express.Router();

//  CATERGORY CRUD OPERATIONS:

// create CATEGORY routes || POST
router.post('/create', authMiddleware, createCategoryController);

// GET ALL CATEGORY ROUTES || GET
router.get('/getAll', getAllCategoriesController);
// UPDATE CATEGORY ROUTES || PUT
router.put('/update/:id', authMiddleware, updateCategoryController);
// DELETE CATEGORY ROUTES || DELETE
router.delete('/delete/:id', authMiddleware, deleteCategoryController);

export default router;
