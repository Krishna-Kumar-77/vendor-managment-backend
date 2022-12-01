const express = require('express')
const router = express.Router()
const {
  getVendors,
  createVendors,
  updateVendors,
  deleteVendors,
  getOneVendor
} = require('../controllers/vendorControllers')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get( protect,getVendors).post(protect, createVendors)
router.route('/:id').get(protect,getOneVendor).delete(protect, deleteVendors).put(protect, updateVendors)

module.exports = router
