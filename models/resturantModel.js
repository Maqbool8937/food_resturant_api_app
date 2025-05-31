import mongoose, { mongo } from "mongoose";



//schema
const resturantSchema = new mongoose.Schema({

},
    {
        timestamps: true,
    }
)

export default mongoose.model("Resturant", resturantSchema);