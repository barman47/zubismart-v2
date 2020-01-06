const express = require('express');
const passport = require('passport');
const router = express.Router();

const Product = require('../../models/Product');

const validateAddProduct = require('../../utils/validation/addProduct');

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


// Remove Product
// @route GET /api/products/remove/:id
// @desc Remove Product By Id
// @access Private
router.get('/remove/:id', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    Product.findOneAndRemove({ _id: req.params.id })
        .then(res.json({ msg: 'Product Successfully removed' }))
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
            product.name = req.body.name;

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
    console.log(req.files);
    const { errors, isValid } = validateAddProduct(req.body);   
    let uploadPath = `${__dirname}../../../client/build/uploads/`;
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
            uploadPath = `${__dirname}../../../client/public/uploads/`;
        }

        Product.findOne({ image: image.name })
            .then(product => {
                if (product) {
                    errors.image = 'Item already exists!';
                    return res.status(406).json(errors);
                }

                image.mv(`${uploadPath}${image.name}`, (err => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Upload failed.' });
                    }
                    const product = new Product({
                        category: req.body.category,
                        description: req.body.description,
                        price: req.body.price,
                        name: req.body.name,
                        image: image.name
                    });
                    product.save()
                        .then(savedProduct => {
                            const newProduct = {
                                id: savedProduct.id,
                                user: savedProduct.user,
                                category: savedProduct.category,
                                description: savedProduct.description,
                                price: savedProduct.price,
                                name: savedProduct.name,
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
router.get('/remove/all', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    Product.remove()
        .then(res.json({ msg: 'Products Removed Successfully' }))
        .catch(err => console.log(err));
});

module.exports = router;