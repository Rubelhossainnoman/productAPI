/**
 * <--------------------Get path module----------------->
 */
 const path = require('path');
 const {readFileSync,writeFileSync} = require('fs')
 
 /**
  * <----------------------Create routing system--------------------->
  */
 
 /**
  * @desc Get all customer data
  * @name GET /api/v1/customer
  * @access public
  */
 const allCustomer = (req,res) =>{
    // Get all custoemrs...
    const customers = JSON.parse(readFileSync(path.join(__dirname,'../db/customers.json')));
    // data init...
    res.status(200).json(customers);
 };

 /**
  * @desc create a customer data
  * @name POST /api/v1/customer
  * @access public
  */
 const createCustomer = (req,res) =>{

   const {name,email,cell,district,location,zip_code,shipping_address,billing_address} = req.body;
   // Get All customer...
   const customers = JSON.parse(readFileSync(path.join(__dirname,'../db/customers.json')));
   
   // User validations...
   if (!name || !email || !cell || !district || !location || !zip_code || !shipping_address || !billing_address) {
      res.status(400).json({
         message : "All fields are required"
      })
   } else {
      customers.push({
         id : Math.floor(Math.random() * 100000000).toString(),
         ...req.body,
         photo : req.file ? req.file.filename : "https://i.ibb.co/5jLGqvx/avatar.png"
      })

      // send data in json db...
      writeFileSync(path.join(__dirname,'../db/customers.json'), JSON.stringify(customers));
      res.status(201).json({
         message : "Customer Create successfull"
      });
   }
   
 };

// https://i.ibb.co/5jLGqvx/avatar.png
// https://i.ibb.co/d2sr3c6/default.jpg
// https://i.ibb.co/ScYzNvw/default.png

  /**
  * @desc Get single customer data
  * @name GET /api/v1/customer/:id
  * @access public
  */
const singleCustomer = (req,res) =>{
   
   // Get All customer...
   const customers = JSON.parse(readFileSync(path.join(__dirname,'../db/customers.json')));
   if (customers.some(data => data.id == req.params.id)) {
      const s_Customer = customers.find(data => data.id == req.params.id);
      res.status(200).json(s_Customer);
   } else {
      res.status(201).json({
         message : "Customer Not Found"
      })
   }
   
};

  /**
  * @desc DELETE single customer data
  * @name DELETE /api/v1/customer/:id
  * @access public
  */
const deleteSingeCustomer = (req,res) =>{
   
   // Get All customer...
   const customers = JSON.parse(readFileSync(path.join(__dirname,'../db/customers.json')));
   
   if (customers.some(data => data.id == req.params.id)) {
      const allCustomer = customers.filter(data => data.id != req.params.id);
      writeFileSync(path.join(__dirname,'../db/customers.json'),JSON.stringify(allCustomer));
      res.status(200).json({
         message : "Customer delete successfull"
      })
   } else {
      res.status(201).json({
         message : "Customer data not found"
      })
   }
};

  /**
  * @desc EDIT single customer data
  * @name PUT/PATCH /api/v1/customer/:id
  * @access public
  */
const editSingleCustomer = (req,res) =>{
   // Get All customer...
   const customers = JSON.parse(readFileSync(path.join(__dirname,'../db/customers.json')));

   if (customers.some(data => data.id == req.params.id)) {
      customers[customers.findIndex(data => data.id == req.params.id)] = {
         ...customers[customers.findIndex(data => data.id == req.params.id)],
         ...req.body
      }
      writeFileSync(path.join(__dirname,'../db/customers.json'),JSON.stringify(customers));
      res.status(200).json({
         message : "Customer data update successfull"
      })
   } else {
      res.status(404).json({
         message : "Customer not found"
      })
   }
}

/**
 * Export controlelrs...
 */
module.exports = {
    allCustomer,
    createCustomer,
    singleCustomer,
    deleteSingeCustomer,
    editSingleCustomer
}