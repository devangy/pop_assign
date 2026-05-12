import express from "express";
import users from "../data/users.js";

const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users,
    });
});

usersRouter.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user id",
        });
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user,
    });
});

usersRouter.put("/:id", (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            success: false,
            message: "Username is required",
        });
    }

    const user = users.find((u) => u.id == id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    user.name = name;

    res.status(200).json({
        success: true,
        message: "User name updated successfully",
        data: user,
    });
});

usersRouter.get("/profile/:id", (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user ID!",
        });
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "User name fetched successfully",
        data: user.name,
    });
});

export default usersRouter;
