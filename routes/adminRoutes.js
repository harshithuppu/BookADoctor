const express = require("express");
const router = express.Router();
const { getAdminStats } = require("../controllers/adminController");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

router.get("/stats", authMiddleware, adminOnly, getAdminStats);

module.exports = router;
