const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const cors = require("cors");
dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
const userRoutes =require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/user",userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctors",doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.get("/", (req, res) => {
  res.send("Book A Doctor API Running");
});
const errorHandler = require("./middleware/errorMiddleware");

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});