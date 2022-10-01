/**
 * Get modules
 */
const express = require('express');
const path = require('path');
const { allCategory, addCategory, deleteCategory, updateCategory } = require('../controllers/categoryControllers');
const categoryMulter = require('../middleware/categoryMiddleware');


/**
 * Get routes...
 */
const categoryRoutes = express.Router();

/**
 * Create routes...
 */
 categoryRoutes.route('/').get(allCategory).post(categoryMulter,addCategory);
 categoryRoutes.route('/:id').delete(deleteCategory).put(categoryMulter,updateCategory).patch(categoryMulter,updateCategory);

/**
 * Export categoryRoutes..
 */
module.exports = categoryRoutes;