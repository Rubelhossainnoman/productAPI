/**
 * Get modules....
 */
const express = require('express');
const multer = require('multer');
const path = require('path');
const { allProducts, addProducts, single_product, delete_product, edit_data } = require('../controllers/productsControllers');
const productsMulter = require('../middleware/productsMiddleware');

/**
 * Get routes...
 */
const products = express.Router();

/**
 * Create routes...
 */

products.route('/').get(allProducts).post(productsMulter, addProducts);
products.route('/:slug').get(single_product);
products.route('/:id').delete(delete_product).put(productsMulter,edit_data).patch(productsMulter,edit_data);

/**
 * Export product routes...
 */
module.exports = products;
