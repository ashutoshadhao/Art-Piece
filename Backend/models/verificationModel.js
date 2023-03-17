const mongoose = require("mongoose");
const verificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: false,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model("verification", verificationSchema);
