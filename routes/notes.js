import express from "express";
import notes from "../data/notes.js";

const notesRouter = express.Router();

notesRouter.get("/", (req, res) => {
    if (notes.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No notes found in db",
        });
    }

    return res.status(200).json({
        success: true,
        data: notes,
    });
});

notesRouter.post("/", (req, res) => {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
        return res.status(400).json({
            success: false,
            message: "Title, content and userId are required",
        });
    }

    const newId = Math.random() * 1000;

    const newNote = {
        id: newId,
        title,
        content,
        userId,
    };

    notes.push(newNote);
    res.status(201).json({
        message: "Note created successfully",
        data: newNote,
    });
});

notesRouter.get("/count", (req, res) => {
    const total = notes.length;
    res.status(200).json({
        message: "Total notes count",
        data: total,
    });
});

notesRouter.get("/user/:userId", (req, res) => {
    const userId = req.params.userId;

    if (isNaN(userId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid input! Only numbers allowed",
        });
    }

    const userNotes = notes.filter((n) => n.userId === userId);

    if (userNotes.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No notes found for this user",
        });
    }

    res.status(200).json({
        success: true,
        data: userNotes,
    });
});

notesRouter.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid input! Only numbers allowed",
        });
    }

    const noteIndex = notes.findIndex((n) => n.id === id);

    notes.splice(noteIndex, 1);
    res.status(200).json({
        success: true,
        message: "Note deleted",
    });
});

export default notesRouter;
