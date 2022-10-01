/**
 * <--------------------Get path module----------------->
 */
const path = require('path');
const {readFileSync,writeFileSync} = require('fs')

/**
 * <----------------------Create routing system--------------------->
 */

/**
 * @desc Get all user data
 * @name GET /api/v1/user
 * @access public
 */
const users = (req,res) =>{
    const users = JSON.parse(readFileSync(path.join(__dirname, '../db/users.json')));
    res.status(200).json(users);
}

/**
 * @desc Create new user
 * @name POST /api/v1/user
 * @access public
 */
const createuser = (req,res) =>{
    const {name,skill,age} = req.body
    const users = JSON.parse(readFileSync(path.join(__dirname, '../db/users.json')));
    if (!name || !skill || !age) {
        res.status(400).json({
            massage : "All fields are required"
        })
        
    } else {
        const get_id = Math.ceil(Math.random() * 10000000000);
        users.push({
            id : get_id.toString(),
            ...req.body
        });
        writeFileSync(path.join(__dirname,'../db/users.json'), JSON.stringify(users));
        res.status(201).json(users)
    }
    
}

/**
 * @desc get single user
 * @name GET /api/v1/user/:id
 * @access public
 */
const singleuser = (req,res) =>{
    const users = JSON.parse(readFileSync(path.join(__dirname, '../db/users.json')));
    
    if (users.some(data => data.id == req.params.id)) {
        const singledata = users.find(data => data.id == req.params.id);
        res.status(200).json(singledata);
    }else {
        res.status(404).json({
            message : "Single user not found"
        });
    }
}

/**
 * @desc delete single user
 * @name DELETE /api/v1/user/:id
 * @access public
 */
const deleteuser = (req,res) =>{
    const users = JSON.parse(readFileSync(path.join(__dirname, '../db/users.json')));
    
    if (users.some(data => data.id == req.params.id)) {
        const data = users.filter(data => data.id != req.params.id);
        writeFileSync(path.join(__dirname, '../db/users.json'), JSON.stringify(data));
        res.status(200).json({
            message : "User delete successfull"
        });
    }else{
        res.status(404).json({
            message : "user not found"
        });
    }
}

/**
 * @desc Edit single user
 * @name PUT/PATCH /api/v1/user/edit/:id
 * @access public
 */
const edituser = (req,res) =>{
    const users = JSON.parse(readFileSync(path.join(__dirname, '../db/users.json')));
    
    if (users.some(data => data.id == req.params.id)) {
        
        users[users.findIndex(data => data.id == req.params.id)] ={
            ...users[users.findIndex(data => data.id == req.params.id)],
            ...req.body
        }

        writeFileSync(path.join(__dirname,'../db/users.json'), JSON.stringify(users));
        res.status(200).json({
            message : "User data update successfull"
        })
    }else{
        res.status(404).json({
            message : "user not found"
        });
    }
}

/**
 * <------------------------Export controllers--------------------------->
 */
module.exports = {
    users,
    createuser,
    singleuser,
    deleteuser,
    edituser
}