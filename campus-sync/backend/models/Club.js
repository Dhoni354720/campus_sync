const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  name: String,
  description: String,
  logo: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Club", clubSchema);