import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import paymentRoutes from "./routes/paymentRoutes";
import getSwaggerOptions from "./swagger/swaggerConfig";
import dotenv from "dotenv";
import jwtMiddleware from "./middlewares/authMiddleware";
import errorHandler from "./middlewares/errorHandler";
import https from "https";
import fs from "fs";
import path from "path";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Swagger setup
const swaggerDocs = swaggerJsDoc(getSwaggerOptions());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(express.json());

const corsOptions = {
  origin: ["https://localhost:7200"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Routes
// app.use("/", paymentRoutes);
app.use("/", jwtMiddleware, paymentRoutes);

app.use(errorHandler);

// app.listen(PORT, () => {
//   console.log(`Payment Service running at http://localhost:${PORT}`);
//   console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
// });

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "./certification/server.key")),
  cert: fs.readFileSync(path.join(__dirname, "./certification/server.cert")),
};

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
  console.log(`API Docs available at https://localhost:${PORT}/api-docs`);
});
