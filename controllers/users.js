import { users } from "../data/users.js";

export function getUserById(id) {
    const user = users.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    return user;
}
