const passport = require('passport');
const router = require('express').Router();


module.exports = (passport, Router) => {
    router.route('/login').get((req, res) => {
        passport.authenticate('local')
        .then((user) => {
            
        })
    });
}