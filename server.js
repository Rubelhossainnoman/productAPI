/**
 *<------------------------Express server------------------------->
 */
const express = require('express');
const colors = require('colors');
const env = require('dotenv').config();
const expressLayout = require('express-ejs-layouts');
const router = require('./routes/users');
const customer = require('./routes/customers');
const products = require('./routes/products');
const categoryRoutes = require('./routes/categoryRoutes');
const tagRoutes = require('./routes/tagRoutes');
const brandRoutes = require('./routes/brandRoutes');
const cors = require('cors');

/**
 * <-----------------------Get Server Port---------------------------->
 */
const port = process.env.PORT || 4040;

/**
 * <------------------------Express init------------------------------->
 */
const app = express();

/**
 * <-----------------------Manage From data--------------------------->
 */
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());

/**
 * <------------------------ Static Foulder----------------------------->
 */
app.use(express.static('public'));

/**
 * <-------------------------Set <<<<<<<<<< EJS >>>>>>> Engine---------------------->
 */
app.set('view engine','ejs');

/**
 * <------------------------- Set <<<<<<<<<<< EJS Layout >>>>>>>>>--------------------->
 */
app.use(expressLayout);

/**
 * <----------------------------Set Custome Router location-------------------------->
 */
app.set('layout', 'layouts/app');

/**
 * <-----------------------------Manage Routing System--------------------->
 */
app.use('/api/v1/user', router);
app.use('/api/v1/customer', customer);
app.use('/api/v1/products', products)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/tag', tagRoutes)
app.use('/api/v1/brand', brandRoutes)
 /**
  * <--------------------- Create <<<<<<<<<<<< Server >>>>>>>>>>>>>>--------------------->
  */
 app.listen(port, () =>{
    console.log(`This server is runnin on port ${port}`.bgGreen.white);
 })