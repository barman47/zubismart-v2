const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const router = express.Router();

const Cart = require('../../models/Cart');

// Add Item to cart
// @route POST /api/cart/add
// @desc Add to Cart
// @access Protected
router.post('/add', passport.authenticate('jwt-user', { session: false }), (req, res) => {
    const { itemID, userID } = req.body;
    Cart.findOne({ user: userID })
        .then(cart => {
            if (cart) {
                let newProduct = cart.products.find(product => product.product == itemID);
                if (newProduct === undefined) {
                    cart.products.push({ product: itemID });
                    cart.save()
                        .then((item) => {
                            // res.json(item)
                            res.json(cart);
                        })
                        .catch(err => console.error(err));
                }
            } else {
                cart = new Cart({
                    user: userID,
                    products: [{ product: itemID }]
                });
                cart.save()
                    .then((item) => {
                        res.json(item)
                    })
                    .catch(err => console.error(err));
            }
        })
        .catch(err => console.error(err));
});

// Add items to cart
// @route POST /api/cart/addItems
// @desc Add multiple items to cart
// @access Protected
router.post('/addItems', passport.authenticate('jwt-user', { session: false }), (req, res) => {
    const { userID, products } = req.body;
    Cart.findOne({ user: userID })
        .then(cart => {
            if (cart) {
                // create new products 
                let newProducts = products.map(item => {
                    return {
                        _id: mongoose.Types.ObjectId(),
                        product: mongoose.Types.ObjectId(item.product),
                        quantity: 1
                    };
                });

                // compare old cart products with incoming ones before saving to avoid duplicates
                for (let i = 0; i < newProducts.length; i++ ) {
                    let itemExists;
                    for (let j = 0; j < cart.products.length; j++) {
                        if (Object.is(newProducts[i].product.toString(), cart.products[j].product.toString())) {
                            itemExists = true;
                            break;
                        } else {
                            itemExists = false;
                        }
                    }
                    if (itemExists === false) {
                        cart.products.push(newProducts[i]);
                        itemExists = true;
                    }
                }
                cart.save()
                    .then((cart) => {
                        res.json(cart);
                    })
                    .catch(err => console.error(err));
            } else {
                // create new cart and append cart items    
                const cartProducts = products.map(cartItem => ({ product: cartItem.product, quantity: 1 }));

                newCart = new Cart({
                    user: userID,
                    products: cartProducts
                });

                newCart.save()
                    .then((cart) => {
                        console.log(cart);
                        res.json(cart);
                    })
                    .catch(err => console.error(err));
            }
        })
        .catch(err => console.error(err));
});

// Increase item in cart
// @route POST /api/cart/increment
// @desc Increase Item Count
// @access Protected
router.post('/increment', passport.authenticate('jwt-user', { session: false }), (req, res) => {
    const { itemID, userID } = req.body;
    console.log(req.body);
    Cart.findOne({ user: userID })
        .populate({
            path: 'products.product'
        }) 
        .then(cart => {
            if (cart) {
                let updatedProduct = {};
                cart.products.forEach(product => {
                    if (product.id === itemID) {
                        product.quantity = product.quantity + 1;
                        updatedProduct = product;
                    } else {
                        cart.products.push({
                            quantity: 2,
                            product: itemID
                        });
                    }
                });
                cart.save()
                    .then(res.json(updatedProduct))
                    .catch(err => console.error(err));
            } else {
                cart = new Cart({
                    user: userID,
                    products: [{ product: itemID, quantity: 2 }]
                });
                cart.save()
                    .then((item) => {
                        res.json(item)
                    })
                    .catch(err => console.error(err));
            }
        })
        .catch(err => console.error(err));
});

// Decrease item in cart
// @route POST /api/cart/decrement
// @desc Decrease Item Count
// @access Protected
router.post('/decrement', passport.authenticate('jwt-user', { session: false }), (req, res) => {
    const { itemID, userID } = req.body;
    Cart.findOne({ user: userID })
        .populate({
            path: 'products.product'
        }) 
        .then(cart => {
            let updatedProduct = {};
            let indexOfUpdated;
            cart.products.forEach((product, index) => {
                if (product.id === itemID && product.quantity !== 1) {
                    product.quantity = product.quantity - 1;
                    indexOfUpdated = index;
                    updatedProduct = product;
                }
            });
            cart.save()
                .then(res.json(updatedProduct))
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
});

// Get user cart
// @route GET /api/cart/userId
// @desc Get user cart by id
// @access Protected
router.get('/:userId', passport.authenticate('jwt-user', { session: false }), (req, res) => {
    Cart.findOne({ user: req.params.userId })
        .populate({
            path: 'products.product'
        })
        .then(cart => {
            res.json(cart)
        })
        .catch(err => console.error(err));
});

// PUT Update Cart
// @route GET /api/cart/remove/"cartId/:productId"
// @desc remove cart item by cartId and productId
// @access Protected
router.put('/remove/:cartId/:productId', passport.authenticate('jwt-user', { session: false }), (req, res) => {
    const cartId = req.params.cartId;
    const productId = req.params.productId;

    Cart.findById(cartId)
        .populate({
            path: 'products.product'
        })
        .then(cart => {
            if (cart) {
                let remainingProducts = cart.products.filter(product => product.product._id != productId);
                cart.products = remainingProducts;
                cart.save()
                    .then(updatedCart => res.json(updatedCart))
                    .catch(err => console.error(err));
            }
        })
        .catch(err => console.error(err));
});

module.exports = router;