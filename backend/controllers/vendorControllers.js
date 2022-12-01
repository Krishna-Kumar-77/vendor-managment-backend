const Vendor = require("../models/vendorModel");
const User = require('../models/userModel')

const getVendors = async (req, res) => {
  
    try {
        
        const vendor = await Vendor.find({ user: req.user.id });
        res.status(200).json({ data: vendor });
    }
    catch (error) {

        res.status(400).json({message: error.message})

     }
        
};

const getOneVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    res.status(200).json({ data: vendor });
      
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const createVendors = async (req, res) => {
  if (!req.body.Bank_Account_No) {
      res.status(400)
          .json({ message: 'Please add a account Number' })
    }
  try {

   const vendor = await Vendor.create({
      ...req.body,
      user: req.user.id,
      // Vendor_Name: req.body.Vendor_Name,
      // Bank_Account_No: req.body.Bank_Account_No,
      // Bank_Name: req.body.Bank_Name,
      // Address1: req.body.Address1,
      // Address2: req.body.Address2,
      // City: req.body.City,
      // Country: req.body.Country,
      // Zip_Code: req.body.Zip_Code 

    });
    res.status(200).json(vendor);
  } catch (error) {
    //  console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
 
const updateVendors = async (req, res) => {
  try {
    
      const vendor = await Vendor.findById(req.params.id)
     
          if (!vendor) {
            res.status(400)
                throw new Error('Please Enter a Valid Id')
    }
    
    const user = await User.findById(req.user.id)
    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }

    if (vendor.user.toString() !== user.id) {
      
      res.status(401)
      throw new Error('User not authorized')
    }

    const updateVendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        res.status(200).json(updateVendor);
        
    } catch (error) {
        res.status(400).json({message : error.message})
    }
};
 
const deleteVendors = async (req, res) => {
  
  try {
          const vendor = await Vendor.findById(req.params.id)
          if (!vendor) {
            res.status(400)
                throw new Error('Please Enter a Valid Id')
    }
    const user = await User.findById(req.user.id)
    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }

    if (vendor.user.toString() !== user.id) {
      
      res.status(401)
      throw new Error('User not authorized')
    }


            vendor.remove();
            res.status(200).json({ message: req.params.id });
        } catch (error) {
             res.status(400).json({message: error.message})
        }

};

module.exports = {
  getVendors,
  createVendors,
  updateVendors,
  deleteVendors,
  getOneVendor,
};
