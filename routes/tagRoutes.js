/**
 * Get modules
 */
const express = require('express');
const path = require('path');
const { allTag, addTag, deleteTag, updateTag } = require('../controllers/tagControllers');
const tagMulter = require('../middleware/tagMiddleware');


/**
 * Get routes...
 */
const tagRoutes = express.Router();

/**
 * Create routes...
 */
 tagRoutes.route('/').get(allTag).post(tagMulter,addTag);
 tagRoutes.route('/:id').delete(deleteTag).put(tagMulter,updateTag).patch(tagMulter,updateTag);

/**
 * Export tagRoutes..
 */
module.exports = tagRoutes;