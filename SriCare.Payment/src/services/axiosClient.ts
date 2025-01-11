import axios from "axios";
import https from "https";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Load the self-signed certificate
const certPath = path.join(__dirname, "../certification/server.cert");
const certificate = fs.readFileSync(certPath);
const baseURL = `https://localhost:${process.env.GATEWAY_PORT}/mock-payment-gateway`;

// Create an Axios instance with the self-signed certificate
const axiosInstance = axios.create({
  baseURL,
  httpsAgent: new https.Agent({
    ca: certificate, // Add the self-signed certificate to the trusted CA list
  }),
});

export default axiosInstance;
