const express = require("express");
const { body, validationResult } = require("express-validator");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

// Create task
router.post("/", auth, [body("title").notEmpty()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const task = new Task({ ...req.body, owner: req.userId });
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// List tasks with optional search/filter
router.get("/", auth, async (req, res) => {
  const { q, completed } = req.query;
  const filter = { owner: req.userId };
  if (completed !== undefined) filter.completed = completed === "true";
  if (q) filter.title = { $regex: q, $options: "i" };

  try {
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get single task
router.get("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.userId });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update task
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { ...req.body },
      { new: true },
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.userId,
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
