import mongoose, { mongo } from "mongoose";


const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Category title is required"],
        },
        imageUrl: {
            type: String,
            default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.canva.com%2Ftemplates%2Fs%2Ffood-logo%2F&psig=AOvVaw3qTTyxZAPbzeFUh8Bw9ZJT&ust=1748830683083000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIDK85OUz40DFQAAAAAdAAAAABAE"
        }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model("Category", categorySchema);