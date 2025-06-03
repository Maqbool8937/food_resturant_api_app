export const adminMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(403).send({
            success: false,
            message: "UNAUTHORIZED ACCESS - User not found",
        });
    }

    if (req.user.usertype !== "admin") {
        return res.status(403).send({
            success: false,
            message: "UNAUTHORIZED ACCESS - Admin only route",
        });
    }

    next();
};
