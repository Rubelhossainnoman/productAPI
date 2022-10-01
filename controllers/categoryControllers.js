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
  * @desc Get all category data
  * @name GET /api/v1/category
  * @access public
  */
 const allCategory = (req,res) =>{
    // Get all Category...
    const category = JSON.parse(readFileSync(path.join(__dirname,'../db/category.json')));
    // data init...
    res.status(200).json(category);
 };

 /**
  * @desc POST all category data
  * @name POST /api/v1/category
  * @access public
  */
 const addCategory = (req,res) =>{
    const {name} = req.body;
    // Get all Category...
    const categorys = JSON.parse(readFileSync(path.join(__dirname,'../db/category.json')));
    categorys.push({
        id : Math.floor(Math.random() * 100000000),
        ...req.body,
        name : name.toUpperCase(),
        category_photo : req.file ? req.file.filename : "https://i.ibb.co/d2sr3c6/default.jpg",
        category_slug : name.split(' ').join('-').toUpperCase(),
        status : true
    });
    console.log(name);
    writeFileSync(path.join(__dirname,'../db/category.json'), JSON.stringify(categorys));
    res.status(200).json({
        message : "Category create successfull"
    })
 };

  /**
  * @desc DELETE all category data
  * @name DELETE /api/v1/category/:id
  * @access public
  */
 const deleteCategory = (req,res) =>{
    // Get all Category...
    const categorys = JSON.parse(readFileSync(path.join(__dirname,'../db/category.json')));
    if (categorys.some(data => data.id == req.params.id)) {
        const new_data = categorys.filter(data => data.id != req.params.id)
        writeFileSync(path.join(__dirname,'../db/category.json'),JSON.stringify(new_data));
        res.status(200).json({
            message : "Category delete successfull"
        })
    } else {
        res.status(404).json({
            message : "Category not found"
        })
    }
 }

  /**
  * @desc PUT/PATCH all category data
  * @name PUT/PATCH /api/v1/category/:id
  * @access public
  */
const updateCategory = (req,res) =>{
    const {name} = req.body;
    // Get all Category...
    const categorys = JSON.parse(readFileSync(path.join(__dirname,'../db/category.json')));
    if (categorys.some(data => data.id == req.params.id)) {
        categorys[categorys.findIndex(data => data.id == req.params.id)] = {
            ...categorys[categorys.findIndex(data => data.id == req.params.id)],
            ...req.body,
            name : name.toUpperCase(),
            category_photo : req.file ? req.file.filename : "https://i.ibb.co/d2sr3c6/default.jpg",
            category_slug : name.split(' ').join('-').toUpperCase(),
            status : true
        }
        writeFileSync(path.join(__dirname,'../db/category.json'), JSON.stringify(categorys));
        res.status(201).json({
            message : "Category update successfull"
        })
    } else {
        res.status(404).json({
            message : "Category not found"
        })
    }
    
}
 /**
  * Export categoryControllers...
  */
 module.exports = {allCategory,addCategory,deleteCategory,updateCategory};