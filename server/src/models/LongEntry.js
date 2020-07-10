const mongoose = require("mongoose");

const { Schema } = mongoose;

const LongEntrySchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    comments: String,
    image: String,
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    latitude: { type: Number, required: true, min: -90, max: 90 },
    longtitude: { type: Number, required: true, min: -180, max: 180 },
    visitedAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const LogEntry = mongoose.model("logEntry", LongEntrySchema);

module.exports = LogEntry;
