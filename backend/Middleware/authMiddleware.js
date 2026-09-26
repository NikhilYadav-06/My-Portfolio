const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied ❌"
        });
    }

    try {

        const decoded = jwt.verify(
            token.replace("Bearer ", ""),
            process.env.JWT_SECRET
        );

        req.admin = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token ❌"
        });

    }
}

module.exports = authMiddleware;