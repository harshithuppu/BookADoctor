const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
        family: 4 // Force IPv4
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Connection Error:", error.message);
    // process.exit(1); // Don't exit immediately to allow retries or better logging
  }
};

module.exports = connectDB;