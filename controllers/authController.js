import userModel from "../models/userModel.js";

// REGISTER CONTROLLER
export const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address } = req.body;

        // Validation
        if (!userName || !email || !password || !phone) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
            });
        }

        // Create user
        const user = await userModel.create({
            userName,
            email,
            password,
            phone,
            address,
        });

        res.status(201).json({
            message: "User registered successfully",
            success: true,
            user, // Optional: send user info (avoid password)
        });
    } catch (error) {
        console.error("Error in registerController:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error,
        });
    }
};

// LOGIN CONTROLLER
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide Email and Password",
                success: false,
            });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // For now: simple password match (DO NOT use in production)
        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false,
            });
        }

        res.status(200).json({
            message: "Login successful",
            success: true,
            user, // Optional: exclude password when sending user info
        });
    } catch (error) {
        console.error("Error in loginController:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error,
        });
    }
};
