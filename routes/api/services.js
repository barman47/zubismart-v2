const express = require('express');
const passport = require('passport');
const router = express.Router();

const Service = require('../../models/Service');

const validateAddService = require('../../utils/validation/addService');

// Find services
// @route GET /api/services/all
// @desc Find all services
// @access Public
router.get('/all', (req, res) => {
    let errors = {};
    Service.find()
        .then(services => {
            if (services.length < 1) {
                errors.services = 'No services at this time';
                return res.status(404).json(errors);
            }
            res.json(services);
        })
        .catch(err => console.log(err));
});

// Find services
// @route GET /api/services/:category
// @desc Find Service by Category
// @access Public
router.get('/:category', (req, res) => {
    let errors = {};
    Service.find({ category: req.params.category })
        .then(services => {
            if (services.length < 1) {
                errors.services = 'No services at this time';
                return res.status(404).json(errors);
            }
            res.json(services);
        })
        .catch(err => console.log(err));
});


// Remove Service
// @route GET /api/services/remove/:id
// @desc Remove Service By Id
// @access Private
router.get('/remove/:id', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    Service.findOneAndRemove({ _id: req.params.id })
        .then(res.json({ msg: 'Service Successfully removed' }))
        .catch(err => console.log(err));
});

// Edit
// @route PUT /api/services/update/:id
// @desc Edit Service By Id
// @access Private
router.put('/update/:id', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    Service.findOne({ _id: req.params.id })
        .then(service => {
            service.category = req.body.category;
            service.description = req.body.description;
            service.name = req.body.name;

            service.save()
                .then(updatedService => res.json(updatedService))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});


// Register add Service
// @route POST /api/services/add
// @desc Add new Service
// @access Private
router.post('/add', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    const { errors, isValid } = validateAddService(req.body);   
    let uploadPath = `${__dirname}../../../client/build/uploads/`;
    try {
        const image = req.files.image;
        if (!isValid) {
            return res.status(400).json(errors);
        }

        if (req.files === null) {
            errors.image = 'Item image is required';
            return res.statsu(400).json(errors)
        }


        if (process.env.NODE_ENV !== 'Serviceion') {
            uploadPath = `${__dirname}../../../client/public/uploads/`;
        }

        const service = new Service({
            category: req.body.category,
            description: req.body.description,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            image: image.name
        });

        Service.findOne({ image: image.name })
            .then(Service => {
                if (Service) {
                    errors.image = 'Service already exists!';
                    return res.status(406).json(errors);
                }

                image.mv(`${uploadPath}${image.name}`, (err => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Upload failed.' });
                    }
                    service.save()
                        .then(savedService => {
                            const newService = {
                                id: savedService.id,
                                category: savedService.category,
                                description: savedService.description,
                                name: savedService.name,
                                email: savedService.email,
                                phone: savedService.phone,
                                address: savedService.address,
                                image: savedService.image
                            };
                            res.json(newService);
                        })
                        .catch(err => console.log(err));
                }));
            })
            .catch(err => console.log(err));
    } catch (err) {
        errors.image = 'Service image is required';
        console.log(err);
        return res.status(400).json(errors);
    }
});

// Remove Service
// @route GET /api/services/remove/all
// @desc Remove all services
// @access Private
router.get('/remove/all', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    Service.remove()
        .then(res.json({ msg: 'services Removed Successfully' }))
        .catch(err => console.log(err));
});

module.exports = router;