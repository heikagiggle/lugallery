"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorize_1 = require("../middleware/authorize");
const router = express_1.default.Router();
router.get("/partner/dashboard", (0, authorize_1.authorize)(["PARTNER"]), (_req, res) => {
    res.json({ message: "Welcome to the Partner dashboard!" });
});
router.get("/apprentice/dashboard", (0, authorize_1.authorize)(["APPRENTICE"]), (_req, res) => {
    res.json({ message: "Welcome to the Apprentice dashboard!" });
});
exports.default = router;
