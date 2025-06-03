import categoryModel from '../models/categoryModel.js';

export const createCategoryController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        // Validation
        if (!title) {
            return res.status(400).send({
                success: false,
                message: "Title and Image URL are required",

            })
        }
        // Create Category
        const newCategory = new categoryModel({ title, imageUrl });
        await newCategory.save();
        res.status(201).send({
            success: true,
            message: "New category created successfully",
            newCategory,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in create category Api",
            error,
        })
    }

}

// GET ALL CATEGORIES CONTROLLER 
export const getAllCategoriesController = async (req, res) => {

    try {
        const categories = await categoryModel.find({});
        if (!categories) {
            return res.status(404).send({
                success: false,
                message: "No categories found",
            })
        }
        res.status(200).send({
            success: true,
            message: "All categories fetched successfully",
            totalCount: categories.length,
            categories
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get all categories API",
            error,
        })
    }

}

// UPDATE CATEGORY CONTROLLER 
export const updateCategoryController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        const { id } = req.params;
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, { title, imageUrl }, { new: true });
        if (!updatedCategory) {
            return res.status(404).send({
                success: false,
                message: "Category not found",
            })
        }
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            updatedCategory,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in update category API",
            error,
        })
    }

}

// DELETE CATEGORY CONTROLLER
export const deleteCategoryController = async (req, res) => {
    try {

        const { id } = req.params;
        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Category ID is required",

            })
        }
        const category = await categoryModel.findById(id)
        if (!category) {
            return res.status(500).send({
                success: false,
                message: "No category found with this id",
            })
        }
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Category deleted successfully"
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in delete category API",
            error,
        })
    }
}