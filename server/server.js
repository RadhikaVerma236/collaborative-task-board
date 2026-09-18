const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const taskRoutes = require("./routes/taskRoutes");
const setupSocket = require("./sockets/socket");
const activityRoutes = require("./routes/activityRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/activity", activityRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Task Board API is running",
  });
});

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
const io = setupSocket(server);

// Make Socket.IO available inside controllers
app.set("io", io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});