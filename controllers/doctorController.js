const Doctor = require("../models/Doctor");
const User = require("../models/User");

// Add Doctor
const addDoctor = async (req, res, next) => {
    try {
        const { name, specialization, experience, fees, timings } = req.body;
        
        const doctor = await Doctor.create({
            name,
            specialization,
            experience,
            fees,
            timings,
            userId: req.user._id
        });

        res.status(201).json({
            message: "Doctor Profile Created Successfully. Awaiting Admin Approval.",
            doctor,
        });
    } catch (error) {
        next(error);
    }
};

// Get All Doctors
const getDoctors = async (req, res, next) => {
    try {
        const doctors = await Doctor.find({ status: "approved" });
        res.status(200).json(doctors);
    } catch (error) {
        next(error);
    }
};

const approveDoctor = async (req, res, next) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            { status: "approved" },
            { new: true }
        );

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Also update the User role
        await User.findByIdAndUpdate(doctor.userId, { role: 'doctor' });

        res.status(200).json({
            message: "Doctor Approved Successfully",
            doctor
        });
    } catch (error) {
        next(error);
    }
};

const getDoctorById = async (req, res, next) => {
    try {
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        res.status(200).json(doctor);
    } catch (error) {
        next(error);
    }
};

const getAllDoctors = async (req, res, next) => {
    try {
        const doctors = await Doctor.find({});
        res.status(200).json(doctors);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addDoctor,
    getDoctors,
    approveDoctor,
    getDoctorById,
    getAllDoctors
};