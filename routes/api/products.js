const express = require('express');
const passport = require('passport');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const Product = require('../../models/Product');

const validateAddProduct = require('../../utils/validation/addProduct');

let uploadPath = path.resolve(__dirname, '../../', 'client', 'build', 'uploads');
// let uploadPath = `${__dirname}../../../client/build/uploads`;

// Find products
// @route GET /api/products/all
// @desc Find all products
// @access Public
router.get('/all', (req, res) => {
    let errors = {};
    Product.find()
        .then(products => {
            if (products.length < 1) {
                errors.products = 'No Products at this time';
                return res.status(404).json(errors);
            }
            res.json(products);
        })
        .catch(err => console.log(err));
});

// Find products for homepage
// @route GET /api/products/home
// @desc Find 8 products
// @access Public
router.get('/home', (req, res) => {
    let errors = {};
    Product.find({ enabled: true })
        .sort({ dateAdded: 'desc', test: -1 })
        .limit(8)
        .exec((err, products) => {
            if (err) {
                errors.products = 'No Products at this time';
                return res.status(404).json(errors); 
            }
            res.json(products);
        });
});

// Find product by ID
// @route GET /api/products/id
// @desc Get product by ID
// @access Private
router.get('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            if (product) {
                return res.json(product);
            }
            res.status().json({ msg: 'Product not found' });
        })
        .catch(err => {
            console.error(err);
            res.status(404).json({ msg: 'Product not found' });
        });
});

// Find products
// @route GET /api/products/:category
// @desc Find Product by Category
// @access Public
router.get('/:category', (req, res) => {
    let errors = {};
    Product.find({ category: req.params.category })
        .then(products => {
            if (products.length < 1) {
                errors.products = 'No Products at this time';
                return res.status(404).json(errors);
            }
            res.json(products);
        })
        .catch(err => console.log(err));
});

// Edit
// @route PUT /api/products/update/:id
// @desc Edit Product By Id
// @access Private
router.put('/update/:id', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    Product.findOne({ _id: req.params.id })
        .then(product => {
            product.category = req.body.category;
            product.description = req.body.description;
            product.price = req.body.price;
            product.shippingPrice = req.body.shippingPrice;
            product.name = req.body.name;
            product.brand = req.body.brand;

            product.save()
                .then(updatedProduct => res.json(updatedProduct))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});


// Register add product
// @route POST /api/products/add
// @desc Add new Product
// @access Private
router.post('/add', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    const { errors, isValid } = validateAddProduct(req.body);   
    try {
        const image = req.files.image;
        if (!isValid) {
            return res.status(400).json(errors);
        }

        if (req.files === null) {
            errors.image = 'Product image is required';
            return res.statsu(400).json(errors)
        }

        if (process.env.NODE_ENV !== 'production') {
            uploadPath = path.resolve(__dirname, '../../', 'client', 'public', 'uploads');
        }

        let productCode = [];
        for (var i = 1; i <=10; i++) {
            productCode.push(Math.floor(Math.random() * 10));
        }
        productCode.unshift('ZM');
        productCode.toString();
        productCode = productCode.join('');

        Product.findOne({ image: image.name })
            .then(product => {
                if (product) {
                    errors.image = 'Item already exists!';
                    return res.status(406).json(errors);
                }

                image.mv(`${uploadPath}/${image.name}`, (err => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Upload failed.' });
                    }
                    const product = new Product({
                        category: req.body.category,
                        description: req.body.description,
                        brand: req.body.brand ? req.body.brand : 'Others',
                        price: req.body.price,
                        shippingPrice: req.body.shippingPrice,
                        name: req.body.name,
                        productCode,
                        image: image.name
                    });
                    product.save()
                        .then(savedProduct => {
                            const newProduct = {
                                id: savedProduct.id,
                                category: savedProduct.category,
                                description: savedProduct.description,
                                price: savedProduct.price,
                                shippingPrice: savedProduct.shippingPrice,
                                name: savedProduct.name,
                                brand: savedProduct.brand,
                                image: savedProduct.image
                            };
                            res.json(newProduct);
                        })
                        .catch(err => console.log(err));
                }));
            })
            .catch(err => console.log(err));
    } catch (err) {
        errors.image = 'Product image is required';
        return res.status(400).json(errors);
    }
});

// Remove Product
// @route GET /api/products/remove/all
// @desc Remove all products
// @access Private
router.put('/toggleProduct/:id', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    Product.findOne({ _id: req.params.id })
        .then(product => {
            product.enabled = !product.enabled;
            product.save()
                .then(updatedProduct => {
                    res.json(updatedProduct);
                })
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
});

// Remove Product
// @route DELETE /api/products/delete/:id
// @desc Remove Product By Id
// @access Private
router.delete('/delete/:id', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    if (process.env.NODE_ENV !== 'production') {
        uploadPath = `${__dirname}../../../client/public/uploads`;
    }

    Product.findOneAndRemove({ _id: req.params.id })
        .then(deletedProduct => {
            fs.unlink(`${uploadPath}/${deletedProduct.image}`, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ msg: 'Server Error' });
                }
                res.json(deletedProduct)
            });
        })
        .catch(err => console.log(err));
});

// Remove Product
// @route GET /api/products/remove/all
// @desc Remove all products
// @access Private
router.get('/remove/all', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    Product.remove()
        .then(res.json({ msg: 'Products Removed Successfully' }))
        .catch(err => console.log(err));
});

module.exports = router;