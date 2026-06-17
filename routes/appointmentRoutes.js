const express = require("express");
const router = express.Router();

const {
  bookAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  cancelAppointment,
  getAppointmentsByUser,
  getAppointmentsByDoctor,
  getPendingAppointments,
  getApprovedAppointments,
  getCancelledAppointments,
  addConsultation,
} = require("../controllers/appointmentController");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

router.post("/",authMiddleware, bookAppointment);
router.get("/getAppointments", authMiddleware, adminOnly, getAppointments);
router.get("/getAppointmentsByUser", authMiddleware, getAppointmentsByUser);
router.get("/getMyAppointmentsByDoctor", authMiddleware, getAppointmentsByDoctor);
router.put("/:id" ,authMiddleware, updateAppointmentStatus);
router.delete("/:id" ,authMiddleware, deleteAppointment);
router.get("/user/:userId", authMiddleware, getAppointmentsByUser); // Keep legacy if needed
router.delete("/cancel/:id" ,authMiddleware,cancelAppointment );
router.get( "/doctor/:doctorId", authMiddleware, getAppointmentsByDoctor); // Keep legacy
router.get("/doctor/:doctorId/pending",authMiddleware, getPendingAppointments);
router.get( "/doctor/:doctorId/approved",authMiddleware, getApprovedAppointments);
router.get( "/doctor/:doctorId/cancelled",authMiddleware,getCancelledAppointments);
router.put("/addConsultation/:id", authMiddleware, addConsultation);
module.exports = router;