import jwt from "jsonwebtoken";
// Generate

export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// Verify

export const verifyToken = (token, secret) => {
    return jwt.verify(token, secret)
}