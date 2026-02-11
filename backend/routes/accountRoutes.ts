import express, { Router } from "express";
const {
  deleteAccount,
  changePassword,
} = require("../controllers/account/accountController");
const auth = require("../middleware/auth");

const router: Router = express.Router();

router.put("/change-password", auth, changePassword);
router.delete("/delete-account", auth, deleteAccount);

module.exports = router;
