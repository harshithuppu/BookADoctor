const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
    },

    specialization: {
        type: String,
        required: true,
    },

    experience: {
        type: Number,
        required: true,
    },

    fees: {
        type: Number,
        required: true,
    },
    timings: {
        type: [String],
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
    status: {
        type: String,
        default: "pending"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Doctor", doctorSchema);