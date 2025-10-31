// backend_service/src/server.js - Express server setup with security, CORS, and rate limiting
const path = require("path");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

//use __dirname directly in CommonJS
const envPath = path.resolve(__dirname, "../.env");
dotenv.config({ path: envPath });

const express = require("express");
const { setupRoutes } = require("./routes/routes");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("../config");

const server = express();

// CORS configuration for API routes
const corsOptions = {
  origin: [
    "https://realestateanalyzer.netlify.app",
    "https://realestateanalyzer.vercel.app",
    "https://realestateanalyzerapi.vercel.app",
    "http://localhost:5000",
    "http://localhost:3000",
    "http://localhost:3001",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Apply CORS to all routes first
server.use(cors(corsOptions));

// Apply other middleware
server.use(helmet());
server.use(morgan("combined"));
server.use(express.json({ limit: "50mb" }));

// Apply rate limiting to API routes
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 60,
  message: {
    status: 429,
    message: "Too many requests from this IP, please try again after 1 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

server.use("/api", [apiLimiter]);

setupRoutes(server);

module.exports = server;
