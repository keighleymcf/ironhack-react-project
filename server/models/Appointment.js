const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String, required: true },
    date: Date,
    practice: { type: Schema.Types.ObjectId, ref: "Practice" },
    series: { type: Schema.Types.ObjectId, ref: "Series" },
    documents: [String]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
