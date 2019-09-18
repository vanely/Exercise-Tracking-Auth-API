const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ------------------------------------------------------
// redefine what the following fields will be refered to as and authenticate using the model where they are coming from
// passport config (possibly put in own file)
const Account = require('./models/account.model');
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },  
    (email, password, done) => {
        Account.findOne({email: email})
        .then((user) => {
            if (!user) {
                return done(null, false, {message: 'Incorrect email.'});
            }
            if (!user.validPassword(password)) {
                return done(null, false, {message: 'Incorrect password.'});
            }
        })
        .catch(err => done(err));
    }
));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: '943JHFU367730FDJ023YWMFJD',
    })
);

app.use(passport.initialize());
app.use(passport.session());

// ------------------------------------------------------
// connect to mongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connection initialized');
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Successfully connected to MongoDB');
});

// -----------------------------------------------------
// serve
app.listen(port, () => {
    console.log(`Serving on port: ${port}`);
}); 


// Refs
// feedback api
// foodtruck api
// previous exercise app