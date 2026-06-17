const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

const getAdminStats = async (req, res, next) => {
    try {
        const totalPatients = await User.countDocuments({ role: "patient" });
        const activeDoctors = await Doctor.countDocuments({ status: "approved" });
        const pendingReviews = await Doctor.countDocuments({ status: "pending" });
        
        // Count appointments for today
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0]; // Simple YYYY-MM-DD match for the string field 'date'
        const appointmentsToday = await Appointment.countDocuments({
            date: { $regex: new RegExp(`^${todayStr}`) }
        });

        res.status(200).json({
            totalPatients,
            activeDoctors,
            pendingReviews,
            appointmentsToday
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAdminStats
};
