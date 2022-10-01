/**
 * Get modules
 */
 const express = require('express');
 const path = require('path');
 const { allBrand, addBrand, deleteBrand, updateBrand, single_brand} = require('../controllers/brandControllers');
const brandMulter = require('../middleware/brandMiddleware');

 
 
 /**
  * Get routes...
  */
 const brandRoutes = express.Router();
 
 /**
  * Create routes...
  */
  brandRoutes.route('/').get(allBrand).post(brandMulter,addBrand);
  brandRoutes.route('/:brand').get(single_brand);
  brandRoutes.route('/:id').delete(deleteBrand).put(brandMulter,updateBrand).patch(brandMulter,updateBrand);
 
 /**
  * Export tagRoutes..
  */
 module.exports = brandRoutes;