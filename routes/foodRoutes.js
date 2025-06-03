
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createFoordController, deleteFoodController, getAllFoodsController, getFoodByResturantController, getSingleFoodController, orderStatusController, placeOrderController, updateFoodController } from '../controllers/foodController.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';


const router = express.Router();
// ROUTES FOR FOOD CRUD OPERATIONS
router.post('/create', authMiddleware, createFoordController);
// GET ALL FOOD ITEMS || GET
router.get('/getAll', getAllFoodsController);
// GET SINGLE FOOD ITEM || GET
router.get('/get/:id', getSingleFoodController);
// GET FOOB BY RESTURANT ID || GET
router.get('/getByResturant/:id', getFoodByResturantController);
// UPDATE FOOD || PUT
router.put('/update/:id', authMiddleware, updateFoodController);
// DELETE FOOD || DELETE
router.delete('/delete/:id', authMiddleware, deleteFoodController);
// PLACE ORDER
router.post('/placeorder', authMiddleware, placeOrderController);
// ORDER STATUS
router.post('/orderStatus/:id', authMiddleware, adminMiddleware, orderStatusController);



export default router;
