/**
 * <--------------------Get path module----------------->
 */
 const path = require('path');
 const {readFileSync,writeFileSync} = require('fs');
 const uc = require('upper-case');
 
 /**
  * <----------------------Create routing system--------------------->
  */
 
 /**
  * @desc Get all brand data
  * @name GET /api/v1/brand
  * @access public
  */
 const allBrand = (req,res) =>{
    // Get all brand...
    const brands = JSON.parse(readFileSync(path.join(__dirname,'../db/brand.json')));
    // data init...
    res.status(200).json(brands);
 };

 /**
  * @desc POST all brand data
  * @name POST /api/v1/brand
  * @access public
  */
 const addBrand = (req,res) =>{
    const {name} = req.body;
    // Get all brand...
    const brands = JSON.parse(readFileSync(path.join(__dirname,'../db/brand.json')));
    brands.push({
        id : Math.floor(Math.random() * 100000000),
        ...req.body,
        name : name.toUpperCase(),
        brand_slug : name.split(' ').join('-').toUpperCase(),
        status : true,
        brand_photo : req.file ? req.file.filename : "https://i.ibb.co/d2sr3c6/default.jpg"
    });
    writeFileSync(path.join(__dirname,'../db/brand.json'), JSON.stringify(brands));
    res.status(200).json({
        message : "Brand create successfull"
    })
 };

/**
* @desc GET single brand data
* @name GET /api/v1/brand/:id
* @access public
*/

const single_brand = (req,res) =>{
    // Get all brand...
    const brands = JSON.parse(readFileSync(path.join(__dirname,'../db/brand.json')));
    if (brands.some(data => data.brand_slug == req.params.brand.toUpperCase())) {
        const for_brand = brands.filter(data => data.brand_slug == req.params.brand.toUpperCase());
        res.status(200).json(for_brand);        
    } else {
        res.status(404).json({
            message : "Brand not found"
        })
    }
    
}

/**
* @desc DELETE all brand data
* @name DELETE /api/v1/brand/:id
* @access public
*/
 const deleteBrand = (req,res) =>{
    // Get all Brand...
    const brands = JSON.parse(readFileSync(path.join(__dirname,'../db/brand.json')));
    if (brands.some(data => data.id == req.params.id)) {
        const new_data = brands.filter(data => data.id != req.params.id)
        writeFileSync(path.join(__dirname,'../db/brand.json'),JSON.stringify(new_data));
        res.status(200).json({
            message : "Brand delete successfull"
        })
    } else {
        res.status(404).json({
            message : "Brand not found"
        })
    }
 }

  /**
  * @desc PUT/PATCH all brand data
  * @name PUT/PATCH /api/v1/brand/:id
  * @access public
  */
const updateBrand = (req,res) =>{
    const {name} = req.body;
    // Get all Brand...
    const brands = JSON.parse(readFileSync(path.join(__dirname,'../db/brand.json')));
    if (brands.some(data => data.id == req.params.id)) {
        brands[brands.findIndex(data => data.id == req.params.id)] = {
            ...brands[brands.findIndex(data => data.id == req.params.id)],
            ...req.body,
            name : name.toUpperCase(),
            brand_slug : name.split(' ').join('-').toUpperCase(),
            status : true,
            brand_photo : req.file ? req.file.filename : "https://i.ibb.co/d2sr3c6/default.jpg"
            }
        writeFileSync(path.join(__dirname,'../db/brand.json'), JSON.stringify(brands));
        res.status(201).json({
            message : "Brand update successfull"
        })
    } else {
        res.status(404).json({
            message : "Brand not found"
        })
    }
    
}
 /**
  * Export brandControllers...
  */
 module.exports = {allBrand,addBrand,deleteBrand,updateBrand,single_brand};