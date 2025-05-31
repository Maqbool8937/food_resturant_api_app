import mongoose from "mongoose";



//schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    address: {
        type: Array,
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
    },
    usertype: {
        type: String,
        required: [true, "User type is required"],
        default: "Client",
        enum: ["Client", "Admin", "Seller", "driver"]
    },
    profile: {
        type: String,
        default: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"//will use cloudinary
    },
    answer: {
        type: String,
        required: [true, "Answer is required"],
    }


}, {
    timestamps: true,
})

export default mongoose.model("User", userSchema);