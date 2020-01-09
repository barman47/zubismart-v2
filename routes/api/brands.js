const express = require('express');
const passport = require('passport');
const router = express.Router();

const Brand = require('../../models/Brand');

const validateAddBrand = require('../../utils/validation/addBrand');

// Add Brands
// @route POST /api/brands/add
// @desc add a brand
// @access Private
router.post('/add', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    const { errors, isValid } = validateAddBrand(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const brand = new Brand({
        name: req.body.name,
        category: req.body.category
    });

    brand.save()
        .then(res.json({ msg: 'Brand Added Successfully' }))
        .catch(err => console.error(err));
});

// Remove Brands
// @route GET /api/brands/=/all
// @desc get all brands
// @access Private
router.get('/all', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    console.log('getting brands');
    Brand.find({})
        .then(brands => {
            if (brands) {
                return res.json(brands);
            }
            return res.status(404).json({ msg: 'No Brands Available' });
        })
        .catch(err => {
            if (err) {
                console.error(err);
                return res.status(404).json({ msg: 'No Brands Available' });
            }
        });
});

module.exports = router;