/**
 *<------------------------Express server------------------------->
 */
 const express = require('express');
const { readFileSync } = require('fs');
const {users,createuser,singleuser,deleteuser,edituser} = require('../controllers/usersControllers')

 /**
  * <----------------------Get Router---------------------->
  */
 const router = express.Router();

 /**
  * <----------------------Create Routing system------------------------>
  */
router.route('/').get(users).post(createuser);
router.route('/:id').get(singleuser).delete(deleteuser);
router.route('/edit/:id').put(edituser).patch(edituser);

 /**
  * <--------------------- Export router--------------------->
  */
 module.exports = router;
 