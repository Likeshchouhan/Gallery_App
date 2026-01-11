const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  email: { type: String, unique: true },
  address: String,
  userId: { type: Number, unique: true },
  password: String
});

module.exports = mongoose.model("User", userSchema);
