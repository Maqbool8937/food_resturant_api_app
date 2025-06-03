import mongoose, { mongo } from "mongoose";


const ordersSchema = new mongoose.Schema(
    {
        foods: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Food",
            }
        ],
        payment: {},
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        status: {
            type: String,
            enum: ["Preparing", "Prepare", "on the way", "delivered"],
            default: "Preparing"
        }

    },
    {
        timestamps: true,
    }
)

export default mongoose.model("Orders", ordersSchema);