// routes/index.js
const express = require("express");
const router = express.Router();
const { HEALTH_STATUS } = require("../constants/constants");
const dealRoutes = require("./sub routes/deal.routes");
const uploadRoutes = require("./sub routes/upload.routes");

const setupRoutes = (server) => {
  // Health check
  server.get("/health", async (req, res) => {
    res.status(200).json({ status: HEALTH_STATUS.UP });
  });

  server.get("/", async (req, res) => {
    res.status(200).json({
      status: HEALTH_STATUS.UP,
      message: "Real Estate Deal Analyzer API",
      version: "1.0.0",
    });
  });

  // API routes
  server.use("/api/deals", dealRoutes);

  server.use("/api/upload", uploadRoutes);
};

module.exports = { setupRoutes };
