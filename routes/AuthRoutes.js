const express = require("express");
const { register, login, getProfile } = require("../controllers/AuthController.js");
const { authMiddleware } = require("../middleware/AuthMiddleware.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
