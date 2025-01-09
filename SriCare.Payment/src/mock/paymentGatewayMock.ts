import express from "express";
import dotenv from "dotenv";
import https from "https";
import fs from "fs";
import path from "path";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.GATEWAY_PORT || 3001;

app.use(express.json());
app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Mock in-memory data
const transactions: Record<string, any> = {};

app.post("/mock-payment-gateway/process", (req, res) => {
  const { amount, method, userId } = req.body;
  const transactionId = `txn_${Date.now()}`;
  const transaction = {
    transactionId,
    amount,
    method,
    userId,
    status: "completed",
    timestamp: new Date(),
  };
  transactions[transactionId] = transaction;
  res.status(200).json(transaction);
});

app.get("/mock-payment-gateway/transaction/:id", (req, res) => {
  const { id } = req.params;
  const transaction = transactions[id];
  if (transaction) {
    res.status(200).json(transaction);
  } else {
    res.status(404).json({ message: "Transaction not found" });
  }
});

// app.listen(PORT, () => {
//   console.log(`Mock Payment Gateway running at http://localhost:${PORT}`);
// });

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "../certification/server.key")),
  cert: fs.readFileSync(path.join(__dirname, "../certification/server.cert")),
};

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Mock Payment Gateway running at https://localhost:${PORT}`);
});
