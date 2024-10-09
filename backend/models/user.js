const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  // displayName: {
  //   type: String,
  //   default: "",
  // },
  // photoUrl: {
  //   type: String,
  //   default: "",
  // },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Users", userSchema);
