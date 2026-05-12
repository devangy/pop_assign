import express from "express";
import usersRouter from "./routes/users.js";
import notesRouter from "./routes/notes.js";
import authRouter from "./routes/auth.js";
import { fetchExternalData } from "./services/external-service.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", usersRouter);
app.use("/notes", notesRouter);
app.use("/auth", authRouter);

app.get("/external-data", async (req, res) => {
    try {
        const data = await fetchExternalData();

        return res.status(200).json({
            success: true,
            message: "External data fetched successfully",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch external data",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
