const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const {Schema} = mongoose;

const Account = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
            trim: true,
            minlength: 4
        },
        password: {
            type: String,
            required: true,
            minlength: 4,
        }
    },
    {
        timestamps: true,
    }
);

Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('UserAccount', Account);
