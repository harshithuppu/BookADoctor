const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

// Book Appointment
const bookAppointment = async (req, res, next) => {
  try {
    const { doctorId, date } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor || doctor.status !== "approved") {
      return res.status(400).json({ message: "Doctor not available for booking" });
    }

    const appointment = await Appointment.create({
        userId: req.user._id,
        doctorId,
        date
    });

    res.status(201).json({
      message: "Appointment Booked Successfully",
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Appointments (Admin Only usually, handled by routes)
const getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find().populate("userId", "name").populate("doctorId", "name");
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

const updateAppointmentStatus = async (req, res, next) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        res.status(200).json({
            message: "Status Updated",
            appointment
        });
    } catch (error) {
        next(error);
    }
};

const deleteAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        res.status(200).json({
            message: "Appointment Deleted Successfully"
        });
    } catch (error) {
        next(error);
    }
};

const cancelAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: "cancelled" },
            { new: true }
        );

        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        res.status(200).json({
            message: "Appointment Cancelled Successfully",
            appointment
        });
    } catch (error) {
        next(error);
    }
};

const getAppointmentsByUser = async (req, res, next) => {
    try {
        const appointments = await Appointment.find({
            userId: req.user._id
        }).populate("doctorId", "name specialization");

        res.status(200).json(appointments);
    } catch (error) {
        next(error);
    }
};

const getAppointmentsByDoctor = async (req, res, next) => {
    try {
        let doctorId = req.params.doctorId;
        
        if (!doctorId) {
            const doctor = await Doctor.findOne({ userId: req.user._id });
            if (!doctor) {
                return res.status(404).json({ message: "Doctor profile not found" });
            }
            doctorId = doctor._id;
        }

        const appointments = await Appointment.find({
            doctorId: doctorId
        }).populate("userId", "name email");

        res.status(200).json(appointments);
    } catch (error) {
        next(error);
    }
};

const getPendingAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.find({
            doctorId: req.params.doctorId,
            status: "pending"
        });

        res.status(200).json(appointments);
    } catch (error) {
        next(error);
    }
};

const getApprovedAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.find({
            doctorId: req.params.doctorId,
            status: "approved"
        });

        res.status(200).json(appointments);
    } catch (error) {
        next(error);
    }
};

const getCancelledAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.find({
            doctorId: req.params.doctorId,
            status: "cancelled"
        });

        res.status(200).json(appointments);
    } catch (error) {
        next(error);
    }
};

const addConsultation = async(req, res, next)=>  {
    try {
        const { consultationNotes, prescription } = req.body;

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            {
                consultationNotes,
                prescription,
                status: "completed"
            },
            { new: true }
        ).populate("userId", "name email");

        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        res.status(200).json({
            message: "Consultation Added",
            appointment
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
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
  addConsultation
};