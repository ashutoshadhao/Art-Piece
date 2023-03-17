const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.ObjectId,
    required: false,
  },
  
  createdAt: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model("cart", verificationSchema);
