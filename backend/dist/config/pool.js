"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const pkg = require("pg");
const { Pool } = pkg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
module.exports = pool;
