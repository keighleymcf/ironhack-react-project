const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seriesSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String, required: true },
    frequency: { type: Number, required: true },
    practice: { type: Schema.Types.ObjectId, ref: "Practice" },
    documents: [String]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Series = mongoose.model("Series", seriesSchema);
module.exports = Series;
