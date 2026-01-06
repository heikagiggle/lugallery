// import express = require("express");
// import dotenv = require("dotenv");
// const pool = require("./config/pool");
// const authRoutes = require("./routes/authRoutes");
// const cors = require("cors");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.use("/api/user", authRoutes);

// pool
//   .connect()
//   .then(() => {
//     console.log("PostgreSQL connected successfully");

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err: Error) => {
//     console.error("PostgreSQL connection error:", err);
//   });

import dotenv from "dotenv";
dotenv.config();

import express = require("express");
import cors = require("cors");
// import "./config/pool";
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/user", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
