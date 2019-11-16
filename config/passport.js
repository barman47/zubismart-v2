const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const Admin = require('../models/Admin');

const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

passport.use('jwt-user', new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then(user => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => console.log(err));
}));

passport.use('jwt-admin', new JwtStrategy(opts, (jwt_payload, done) => {
    Admin.findById(jwt_payload.id)
        .then(admin => {
            if (admin) {
                return done(null, admin);
            } else {
                return done(null, false);
            }
        })
        .catch(err => console.log(err));
}));