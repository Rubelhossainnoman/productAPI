const multer = require('multer');
const path = require('path');

// Config multer....

/**
 * @des For customer ...
 * @filename photo
 */
const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null, path.join(__dirname,'../public/img/products_image/brand/'));
    },
    filename : (req,file,cb) =>{
        cb(null, Date.now() + '_' + Math.floor(Math.random() * 10000000000) + '_' + file.originalname);
    }
});

const brandMulter = multer({
    storage : storage
}).single('brand_photo');



// Export brand multer...
module.exports = brandMulter;