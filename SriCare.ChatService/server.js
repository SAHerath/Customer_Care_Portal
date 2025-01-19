const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 9000;
const FE_PORT = process.env.FE_PORT || 5000;

const express = require("express");
const https = require("https");
const { Server } = require("socket.io");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const corsOptions = {
  origin: ["https://localhost:7300"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "./certification/server.key")),
  cert: fs.readFileSync(path.join(__dirname, "./certification/server.cert")),
};

const server = https.createServer(httpsOptions, app);

const io = new Server(server, {
  cors: {
    origin: `https://localhost:${FE_PORT}`, // Allow your React app's origin
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
