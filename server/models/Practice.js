const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const practiceSchema = new Schema(
  {
    owner: [
        {
          type: Schema.Types.ObjectId, 
          ref: "User"
        }
    ],
    name: {
      type: String,
      required: true
    },
    type: { type: String, required: true },
    address: {street: String, city: String, zip: String},
    phone: String,
    hours: {
      monday: String,
      tuesday: String,
      wednesday: String,
      thursday: String,
      friday: String
    },
    doctors: [String]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Practice = mongoose.model("Practice", practiceSchema);
module.exports = Practice;
