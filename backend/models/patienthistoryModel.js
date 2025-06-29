import mongoose from "mongoose";

const patientHistorySchema = new mongoose.Schema({
  patientId: {
    type: String,
    ref: "user",
    required: true,
  },
  doctorId: {
    type: String,
    ref: "doctor",
    required: true,
  },
  appointmentId: {
    type: String,
    ref: "appointment",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  prescription: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const PatientHistory =
  mongoose.models.PatientHistory ||
  mongoose.model("PatientHistory", patientHistorySchema);

export default PatientHistory;
