const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const vendorSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    Vendor_Name: {
      type: String,
      required: [true, "please add a user "],
    },
    Bank_Account_No: {
      type: String,
      unique: true,
      required: [true, "please add an account Number"],
    },

    Bank_Name: {
      type: String,
      required: [true, "please add bank name"],
    },
    Address1: {
      type: String,
      required: [true, "please add address"],
    },
    Address2: {
      type: String,
    },
    City: {
      type: String,
      required: [true, "please add city"],
    },
    Country: {
      type: String,
      required: [true, "please add Country"],
    },
    Zip_Code: {
      type: String,
      required: [true, "please add your Zip Code"],
    },
  },
  {
    timestamps: true,
  }
);

vendorSchema.plugin(uniqueValidator);

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
