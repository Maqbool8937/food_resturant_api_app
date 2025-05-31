import JWT from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "UN-AUTHORIZE USER",
                success: false,
            });
        }

        const token = authHeader.split(" ")[1];

        JWT.verify(token, process.env.JWT_SECRET, (error, decode) => {
            if (error) {
                return res.status(401).json({
                    message: "UN-AUTHORIZE USER",
                    success: false,
                });
            } else {
                req.user = { id: decode.id };  // ✅ store user info safely here
                next();
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};
