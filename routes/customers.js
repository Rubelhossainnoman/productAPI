/**
 *<------------------------Express server------------------------->
 */
 const express = require('express');
const { allCustomer, createCustomer,singleCustomer,deleteSingeCustomer,editSingleCustomer } = require('../controllers/customerController');
const customerMulter = require('../middleware/costomerMiddleware');


 /**
  * <----------------------Get Router---------------------->
  */
 const customer = express.Router();

 /**zaxS
  * <----------------------Create Routing system------------------------>
  */
 customer.route('/').get(allCustomer).post(customerMulter.single('photo'), createCustomer);
 customer.route('/:id').get(singleCustomer).delete(deleteSingeCustomer);
 customer.route('/edit/:id').put(customerMulter.single('photo'),editSingleCustomer).patch(customerMulter.single('photo'),editSingleCustomer);

 /**
  * <--------------------- Export router--------------------->
  */
 module.exports = customer;
 