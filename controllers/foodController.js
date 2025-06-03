import foodModel from "../models/foodModel.js";
import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";

export const createFoordController = async (req, res) => {

    try {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating
        } = req.body;
        if (!title || !description || !price || !resturant) {
            return res.status(500).send({
                success: false,
                message: "Please provide all the required fields"
            })
        }
        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating
        });
        await newFood.save()
        res.status(201).send({
            success: true,
            message: "New food items created",
            newFood,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in create routes"
        })
    }
}
// GET ALL FOODS CONTROLLER
export const getAllFoodsController = async (req, res) => {

    try {
        const foods = await foodModel.find({})
        if (!foods) {
            return res.status(404).send({
                success: false,
                message: "no food item was found"
            })
        }
        res.status(200).send({
            success: true,
            totalFoods: foods.length,
            foods,
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get all foods API",
            error,
        })

    }
}

// GET SINGLE FOOD CONTROLLER
export const getSingleFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(500).send({
                success: false,
                message: "Food ID is required",
            })
        }
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "Food item not found",

            })
        }
        res.status(200).send({
            success: true,
            food,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get single food API",
            error,
        })
    }
}


// GET FOOD BY RESTURANT ID CONTROLLER
export const getFoodByResturantController = async (req, res) => {
    try {
        const resturantId = req.params.id;
        console.log("Received restaurant ID:", resturantId); // 👈 Add this

        if (!resturantId || !mongoose.Types.ObjectId.isValid(resturantId)) {
            console.log("Invalid restaurant ID");
            return res.status(400).send({
                success: false,
                message: "Invalid restaurant ID",
            });
        }

        const food = await foodModel.find({ resturant: resturantId }); // 👈 Ensure spelling matches schema

        if (!food || food.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No food items found for this restaurant",
            });
        }

        res.status(200).send({
            success: true,
            food,
        });

    } catch (error) {
        console.error("Error in getFoodByResturantController:", error);
        res.status(500).send({
            success: false,
            message: "Server error while fetching food items",
            error: error.message,
        });
    }
};

// UPDATE FOOD CONTROLLER
export const updateFoodController = async (req, res) => {
    try {
        const foodID = req.params.id;
        if (!foodID) {
            return res.status(500).send({
                success: false,
                message: "Food ID is required"
            })
        }
        const food = await foodModel.findById(foodID);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "Food item not found"
            })
        }
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating

        } = req.body;
        const updatedFood = await foodModel.findByIdAndUpdate(foodID, {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating

        }, { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Food item updated successfully",
            updatedFood,
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in update food API",
            error,
        })
    }

}
// DELETE FOOD CONTROLLER
export const deleteFoodController = async (req, res) => {

    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: " Provide foood Id"
            })
        }
        const food = await foodModel.findById(foodId)
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food found with id"
            })
        }
        await foodModel.findByIdAndDelete(foodId)
        res.status(200).send({
            success: true,
            message: "Food Item deleted successfully"
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in delete food API",
            error,
        })
    }
}

// PLACE ORDER
export const placeOrderController = async (req, res) => {
    try {
        const { cart, id: buyerId } = req.body;

        if (!cart || !Array.isArray(cart) || cart.length === 0) {
            return res.status(400).send({
                success: false,
                message: "Please provide food cart and payment method"
            });
        }

        // Calculate total
        let total = 0;
        cart.forEach((item) => {
            total += item.price;
        });

        // Extract only food IDs
        const foodIds = cart.map((item) => item.id || item._id);

        const newOrder = new orderModel({
            foods: foodIds,         // ✅ only IDs here
            payment: total,
            buyer: buyerId,

        });

        await newOrder.save();

        res.status(201).send({
            success: true,
            message: "Order placed successfully",
            newOrder,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Order place API",
            error,
        });
    }
};
// ORDER STATUS CONTROLLER
export const orderStatusController = async (req, res) => {

    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(404).send({
                success: false,
                message: "Order ID is required",
            })
        }
        const { status } = req.body;
        const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            return res.status(404).send({
                success: false,
                message: "Order not found",
            })
        }
        res.status(200).send({
            success: true,
            message: "Order status updated successfully",
            order,
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in order status API",
            error,
        })
    }
}
