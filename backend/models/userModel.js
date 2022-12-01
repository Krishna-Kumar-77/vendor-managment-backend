const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter your password"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;
