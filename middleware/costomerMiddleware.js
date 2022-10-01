const multer = require('multer');
const path = require('path');

// Config multer....

/**
 * @des For customer ...
 * @filename photo
 */
const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null, path.join(__dirname,'../public/img/customer_img/'));
    },
    filename : (req,file,cb) =>{
        cb(null, Date.now() + '_' + Math.floor(Math.random() * 10000000000) + '_' + file.originalname);
    }
});

const customerMulter = multer({
    storage : storage
});



// Export customer multer...
module.exports = customerMulter;