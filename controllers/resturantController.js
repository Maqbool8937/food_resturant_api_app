import resturantModel from "../models/resturantModel.js";

export const createResturantController = async (req, res) => {
    console.log("🔥 Incoming body: ", req.body); // Debug log

    try {
        const {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        } = req.body;

        // Simple validation
        if (!title || !coords) {
            return res.status(400).json({
                success: false,
                message: "title and coords are required",
            });
        }

        const newResturant = new resturantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        });

        await newResturant.save();

        return res.status(201).json({
            success: true,
            message: "New Restaurant Created Successfully",
        });

    } catch (error) {
        console.log("❌ Error: ", error);
        res.status(500).json({
            success: false,
            message: "Error in create restaurant API",
            error: error.message,
        });
    }
};

// GET ALL RESTAURANTS CONTROLLER
export const getAllResturantController = async (req, res) => {

    try {
        const restaurants = await resturantModel.find({});
        if (!restaurants) {
            return res.status(404).send({
                success: false,
                message: "No restaurant found",

            })
        }
        return res.status(200).send({
            success: true,
            message: "All Restaurants fetched successfully",
            totalCount: restaurants.length,
            restaurants,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get all restaurant Api",
            error,
        })
    }
}
// GET RESTURANT BY ID CONTROLLER
export const getResturantByIdController = async (req, res) => {
    try {
        const resturantId = req.params.id;
        if (!resturantId) {
            return res.status(404).send({
                success: false,
                message: "Please provide a restaurant ID",
            })
        }
        const restaurant = await resturantModel.findById(resturantId);
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: "Restaurant not found",

            })
        }
        res.status(200).send({
            success: true,
            message: "Restaurant fetched SUCCESSFULLY",
            restaurant,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get restaurant by id API",
            error,
        })
    }

}

// DELETE RESTURANT CONTROLLER
export const deleteResturantController = async (req, res) => {

    try {
        const resturantId = req.params.id
        if (!resturantId) {
            return res.status(404).send({
                success: false,
                message: "Please provide RESTURANT ID"
            })
        }
        if (!resturantId) {
            return res.status(404).send({
                success: false,
                message: "NO RESTURANT FOUND"
            })
        }
        await resturantModel.findByIdAndDelete(resturantId);
        res.status(200).send({
            success: true,
            message: "Resturant deleted successfully",
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in delete resturant api"
        })
    }
}