import userModel from "../models/userModel.js";

export const registerController = async (req,res) =>{

    try{
        const {userName, email, password, phone, address} = req.body;
        //validation
        if(!userName || !email || !password || !phone){
            return res.status(400).json({
                message:"All fields are required",
                success:false,
            })
        }
        //check if user already exists
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"User already exists",
                success:false,
            });
        }
  
     // create user
      const user = await userModel.create({
        userName,
        email,
        password,
        phone,
        address,
      } );
      res.status(201).json({
        message:"User registered successfuly",
        success:true,

      })

      



    }catch(error){
        console.log("Error in registerController:",error);
        res.status(500).json({
            message:"Internal server error",
            success:false,
            error
            
        })
    }

}