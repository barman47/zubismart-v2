const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();

const validateRegisterInput = require('../../utils/validation/register');
const validateLoginInput = require('../../utils/validation/login');
const validateChangePasswordInput = require('../../utils/validation/changePassword');
const validateUpdateDataInput = require('../../utils/validation/updateData');

const { secretOrKey } = require('../../config/keys');

// Register new user
// @route POST /api/users/register
// @desc register user
// @access Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(returnedUser => {
            if (returnedUser) {
                errors.email = 'User already exists!';
                return res.status(406).json(errors);
            }

            const user = new User({
                firstName: req.body.firstName.toUpperCase(),
                lastName: req.body.lastName.toUpperCase(),
                phone: req.body.phone,
                email: req.body.email.toLowerCase(),
                password: req.body.password
            });

            console.log(user);
        
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return console.log(err);
                }
        
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) {
                        return console.log(err);
                    }
                    user.password = hash;
                    user.save()
                        .then(res.json({ msg: 'User created successfully' }))
                        .catch(err => console.log(err))
                });
            });
        })
        .catch(err => console.log(err));
});

// Login user
// @route POST /api/users/login /Returmn JWT token
// @desc login user
// @access Private
// router.post('/login', (req, res) => {
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.user = 'User does not exist!';
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        errors.password = 'Incorrect password!';
                        return res.status(401).json(errors);
                    }
                    const payload = {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        phone: user.phone,
                        lastSeen: user.lastSeen,
                        createdAt: user.createdAt
                    };
                    // Sign the token
                    jwt.sign(payload, secretOrKey, { expiresIn: '30 days' }, (err, token) => {
                        res.json({
                            success: true,
                            token: `Bearer ${token}`
                        });
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

// Change password
// @route POST /api/users/changePassword
// @desc change user password
// @access Public
router.put('/changePassword', passport.authenticate('jwt-user', { session: false }), (req, res) => {
    const { errors, isValid } = validateChangePasswordInput(req.body);
    const { currentPassword, newPassword } = req.body;

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findById(req.user.id)
        .then(user => {
            if (user) {
                bcrypt.compare(currentPassword, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            errors.currentPassword = 'Incorrect Password!';
                            return res.status(401).json(errors);
                        }
                        bcrypt.genSalt(10, (err, salt) => {
                            if (err) {
                                return console.log(err);
                            }
                    
                            bcrypt.hash(newPassword, salt, (err, hash) => {
                                if (err) {
                                    return console.log(err);
                                }
                                bcrypt.compare(newPassword, user.password)
                                    .then(isMatch => {
                                        if (isMatch) {
                                            errors.newPassword = 'New password cannot be the same with the current password';
                                            return res.status(403).json(errors);
                                        } else {
                                            user.password = hash;
                                            user.save()
                                                .then(() => res.json({ msg: 'Password changed successfully!' }))
                                                .catch(err => console.log(err));
                                        }
                                    })
                                    .catch(err => console.log(err));
                            });
                        });
                    })
                    .catch(err => console.log(err));
            } 
        })
        .catch(err => console.log(err));
});

// Update data
// @route PUT /api/users/updateData
// @desc update user data
// @access Private
router.put('/updateData', passport.authenticate('jwt-user', { session: false }), (req, res) => {
    const { errors, isValid } = validateUpdateDataInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const userData = {
        firstName: req.body.firstName.toUpperCase(),
        lastName: req.body.lastName.toUpperCase(),
        email: req.body.email.toLowerCase(), 
        phone: req.body.phone,
        password: req.body.password
    };

    User.findOne({ _id: req.user.id })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            errors.password = 'Incorrect password!';
                            return res.status(401).json(errors);
                        }
                        user.firstName = userData.firstName;
                        user.lastName = userData.lastName;
                        user.email = userData.email;
                        user.phone = userData.phone;
                        user.adress = userData.adress;
                        user.save()
                            .then(updatedUser => {
                                const payload = {
                                    msg: 'Update Successful',
                                    id: updatedUser.id,
                                    firstName: updatedUser.firstName,
                                    lastName: updatedUser.lastName,
                                    email: updatedUser.email,
                                    phone: updatedUser.phone,
                                    lastSeen: user.lastSeen,
                                    createdAt: user.createdAt,
                                };
                                jwt.sign(payload, secretOrKey, { expiresIn: '30 days' }, (err, token) => {
                                    res.json({
                                        ...payload,
                                        token: `Bearer ${token}`
                                    });
                                });
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
});

module.exports = router;