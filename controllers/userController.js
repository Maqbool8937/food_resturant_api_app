import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';

// Get User Controller
export const getUserController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        user.password = undefined;

        return res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            user,
        });

    } catch (error) {
        console.error("Error in getUserController:", error);
        if (!res.headersSent) {
            res.status(500).json({
                message: "INTERNAL SERVER ERROR",
                success: false,
            });
        }
    }
};

// Update Profile Controller
export const updateProfileController = async (req, res) => {
    try {
        const { userName, phone, address } = req.body;

        const updatedUser = await userModel.findByIdAndUpdate(
            req.user.id,
            { userName, phone, address },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        updatedUser.password = undefined;

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Error in updateProfileController:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
// Reset Paassword Controller
export const resetPasswordCoontroller = async (req, res) => {

    try {
        const { email, answer, newPassword } = req.body;
        // Basic validation
        if (!email || !answer || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please Provide all fields",
            })
        }

        // check if user exists
        const user = await userModel.findOne({
            email,
            answer,
        })
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "User not found or invalid user",

            })
        }
        // hash password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // update password
        user.pasword = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password reset successfully",

        })
    } catch (error) {
        console.error("Error in resetPasswordController:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}


// Update Password Controller
export const updatePasswordController = async (req, res) => {
    try {
        console.log("💡 Controller reached");
        const { currentPassword, newPassword } = req.body;
        console.log("📥 Request body:", req.body);

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Both current and new passwords are required",
            });
        }

        console.log("🔑 Getting user ID from token:", req.user);
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        console.log("🔐 Comparing current password...");
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect",
            });
        }

        console.log("🔄 Hashing new password...");
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        // ✅ Important: skip full validation
        await user.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });

    } catch (error) {
        console.error("💥 Exception in updatePasswordController:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Delette User Controller
export const deleteUserController = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not FOUND",
            })
        }
        res.status(200).send({
            success: true,
            message: "User deleted successfully",
            user,
        })

    } catch (error) {
        console.error("Error in deleteUserController:", error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error,
        })
    }
}