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
  * @desc Get all tag data
  * @name GET /api/v1/tag
  * @access public
  */
 const allTag = (req,res) =>{
    // Get all tag...
    const tags = JSON.parse(readFileSync(path.join(__dirname,'../db/tag.json')));
    // data init...
    res.status(200).json(tags);
 };

 /**
  * @desc POST all tag data
  * @name POST /api/v1/tag
  * @access public
  */
 const addTag = (req,res) =>{
    const {name} = req.body;
    // Get all tag...
    const tags = JSON.parse(readFileSync(path.join(__dirname,'../db/tag.json')));
    tags.push({
        id : Math.floor(Math.random() * 100000000),
        ...req.body,
        name : name.toUpperCase(),
        tag_slug : name.split(' ').join('-').toUpperCase(),
        status : true
    });
    writeFileSync(path.join(__dirname,'../db/tag.json'), JSON.stringify(tags));
    res.status(200).json({
        message : "Tag create successfull"
    })
 };

  /**
  * @desc DELETE all tag data
  * @name DELETE /api/v1/tag/:id
  * @access public
  */
 const deleteTag = (req,res) =>{
    // Get all Category...
    const tags = JSON.parse(readFileSync(path.join(__dirname,'../db/tag.json')));
    if (tags.some(data => data.id == req.params.id)) {
        const new_data = tags.filter(data => data.id != req.params.id)
        writeFileSync(path.join(__dirname,'../db/tag.json'),JSON.stringify(new_data));
        res.status(200).json({
            message : "Tag delete successfull"
        })
    } else {
        res.status(404).json({
            message : "Tag not found"
        })
    }
 }

  /**
  * @desc PUT/PATCH all tag data
  * @name PUT/PATCH /api/v1/tag/:id
  * @access public
  */
const updateTag = (req,res) =>{
    const {name} = req.body;
    // Get all Category...
    const tags = JSON.parse(readFileSync(path.join(__dirname,'../db/tag.json')));
    if (tags.some(data => data.id == req.params.id)) {
        tags[tags.findIndex(data => data.id == req.params.id)] = {
            ...tags[tags.findIndex(data => data.id == req.params.id)],
            ...req.body,
            name : name.toUpperCase(),
            tag_slug : name.split(' ').join('-').toUpperCase(),
            status : true
        }
        writeFileSync(path.join(__dirname,'../db/tag.json'), JSON.stringify(tags));
        res.status(201).json({
            message : "Tag update successfull"
        })
    } else {
        res.status(404).json({
            message : "Tag not found"
        })
    }
    
}
 /**
  * Export categoryControllers...
  */
 module.exports = {allTag,addTag,deleteTag,updateTag};