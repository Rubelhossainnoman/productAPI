const multer = require('multer');
const path = require('path');

// Config multer....

/**
 * @des For customer ...
 * @filename photo
 */
const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null, path.join(__dirname,'../public/img/products_image/category/'));
    },
    filename : (req,file,cb) =>{
        cb(null, Date.now() + '_' + Math.floor(Math.random() * 10000000000) + '_' + file.originalname);
    }
});

const categoryMulter = multer({
    storage : storage
}).single('category_photo');


// Export customer multer...
module.exports = categoryMulter;