const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,

  date: Date,

  // 🔥 ADD THIS
  time: String,

  venue: String,
  capacity: Number,

  // 🔥 ADD THIS
  status: {
    type: String,
    default: "Published"
  },

  // 🔥 VERY IMPORTANT
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);