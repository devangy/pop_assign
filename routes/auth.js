import express from "express";

const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required",
        });
    }

    if (email === "admin@test.com" && password === "123456") {
        return res.status(200).json({
            success: true,
            message: "Login successful",
        });
    }

    return res.status(401).json({
        success: false,
        message: "Invalid credentials",
    });
});

export default authRouter;
