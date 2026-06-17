const express = require("express");
const router = express.Router();
const {
    addDoctor,
    getDoctors,
    approveDoctor,
    getDoctorById,
    getAllDoctors,
} = require("../controllers/doctorController");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addDoctor);
router.get("/", getDoctors);
router.get("/all-doctors", authMiddleware, adminOnly, getAllDoctors);
router.put("/:id", authMiddleware, adminOnly, approveDoctor);
router.get("/:id", getDoctorById);

module.exports = router;