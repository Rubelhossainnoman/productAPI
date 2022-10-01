/**
 * Get modules...
 */
const path = require('path');
const {readFileSync,writeFileSync} = require('fs');
const { join } = require('path');
const uc = require('upper-case');

/**
 * @des Get all products...
 * @name GET /api/v1/products
 * @access public
 */
const allProducts = (req,res) =>{
    // All Products...
    const products = JSON.parse(readFileSync(path.join(__dirname,'../db/products.json')));
    res.status(200).json(products);
}

/**
 * @des  Add product...
 * @name POST /api/v1/products
 * @access public
 */

const addProducts=(req,res)=>{
    // Distructre...
    const {title,reguler_price,sale_price,stoke,short_desc,long_desc,category,tag,brand} = req.body
    // All Products...
    const products = JSON.parse(readFileSync(path.join(__dirname,'../db/products.json')));
    if (!title || !reguler_price || !sale_price || !stoke || !short_desc || !long_desc || !category || !tag || !brand) {
        res.status(201).json({
            message : "All fields are required"
        });
    } else {

        products.push({
            id : Math.floor(Math.random() * 1000000).toString(),
            ...req.body,
            title : title.toUpperCase(),
            category : category.toUpperCase(),
            tag : tag.toUpperCase(),
            brand : brand.toUpperCase(),
            product_photo : req.files ? req.files[0].filename : "https://i.ibb.co/d2sr3c6/default.jpg",
            product_slug : title.split(' ').join('-').toUpperCase(),
            category_slug : category.split(' ').join('-').toUpperCase(),
            tag_slug : tag.split(' ').join('-').toUpperCase(),
            brand_slug : brand.split(' ').join('-').toUpperCase(),
            product_status : true
        })
        // Now writeFileSync...here...
        writeFileSync(path.join(__dirname,'../db/products.json'), JSON.stringify(products));
        res.status(201).json({
            message: "Product Create Successfull"
        })
    }
}

/**
 * @des Get single product...
 * @name GET /api/v1/products/product-name
 * @access public
 */
const single_product = (req,res) =>{
    // All Products...
    const products = JSON.parse(readFileSync(path.join(__dirname,'../db/products.json')));
    // Use if else
    if (products.some(data => data.product_slug == req.params.slug)) {
        const single_data = products.find(data => data.product_slug == req.params.slug)
        res.status(200).json(single_data)
    } else {
        res.status(201).json({
            message : "Product not found"
        })
    }
}
/**
 * @des DELETE single product...
 * @name DELETE /api/v1/products/:id
 * @access public
 */
const delete_product = (req,res) =>{
    // All Products...
    const products = JSON.parse(readFileSync(path.join(__dirname,'../db/products.json')));
    // Use if else
    if (products.some(data => data.id == req.params.id)) {
        const new_data = products.filter(data => data.id != req.params.id);
        writeFileSync(path.join(__dirname,'../db/products.json'), JSON.stringify(new_data));
        res.status(200).json({
            message : "Data delete successfull"
        })
    } else {
        res.status(201).json({
            message : "Product not found"
        })
    }
}

/**
 * @des EDIT single product...
 * @name PUT/PATCH /api/v1/products/:id
 * @access public
 */
const edit_data = (req,res) =>{
    // Data distructure...
    const {title,reguler_price,sale_price,stoke,short_desc,long_desc,category,tag,brand} = req.body;
    // All Products...
    const products = JSON.parse(readFileSync(path.join(__dirname,'../db/products.json')));
    if (products.some(data => data.id == req.params.id)) {
        products[products.findIndex(data => data.id == req.params.id)] = {
            ...products[products.findIndex(data => data.id == req.params.id)],
            ...req.body,
            title : title.toUpperCase(),
            category : category.toUpperCase(),
            tag : tag.toUpperCase(),
            brand : brand.toUpperCase(),
            product_photo : req.files ? req.files[0].filename : "https://i.ibb.co/d2sr3c6/default.jpg",
            product_slug : title.split(' ').join('-').toUpperCase(),
            category_slug : req.body.category ? category.split(' ').join('-').toUpperCase() : 'Uncategory',
            tag_slug : req.body.tag ? tag.split(' ').join('-').toUpperCase() : 'default',
            brand_slug : req.body.brand ? brand.split(' ').join('-').toUpperCase() : 'default',
            product_status : true
        }
        writeFileSync(path.join(__dirname,'../db/products.json'), JSON.stringify(products));
        res.status(200).json({
            message : "Data update successfull"
        })
    } else {
        res.status(201).json({
            message : "Product not found..."
        })
    }
    
}

/**
 * Export products controllers...
 */
module.exports = {
    allProducts,
    addProducts,
    single_product,
    delete_product,
    edit_data
};