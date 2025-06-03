import mongoose, { mongo } from "mongoose";


const foodSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Food title is required"],
        },
        description: {
            type: String,
            required: [true, "Food description is required"],
        },
        price: {
            type: Number,
            required: [true, "Food price is required"],
        },
        imageUrl: {
            type: String,
            default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.canva.com%2Ftemplates%2Fs%2Ffood-logo%2F&psig=AOvVaw3qTTyxZAPbzeFUh8Bw9ZJT&ust=1748830683083000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIDK85OUz40DFQAAAAAdAAAAABAE"


        },

        foodTags: {
            type: String,
        },
        category: {
            type: String,
        },
        code: {
            type: String,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        resturant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resturant"
        },
        rating: {
            type: Number,
            default: 5,
            min: 1,
            max: 5,
        },
        ratingCount: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model("Food", foodSchema);