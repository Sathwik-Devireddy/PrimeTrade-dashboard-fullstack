const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/taskinter";
mongoose
  .connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/me", require("./routes/profile"));
app.use("/api/v1/tasks", require("./routes/tasks"));

app.get("/", (req, res) => res.json({ ok: true, version: "v1" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
