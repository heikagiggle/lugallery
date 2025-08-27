"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const pool = require("./config/pool");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/api/user", authRoutes);
pool
    .connect()
    .then(() => {
    console.log("PostgreSQL connected successfully");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error("PostgreSQL connection error:", err);
});
