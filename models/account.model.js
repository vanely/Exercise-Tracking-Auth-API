const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const {Schema} = mongoose;

const Account = new Schema(
    {
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

const UserAccount = mongoose.model('UserAccount', Account);
Account.plugin(passportLocalMongoose);

module.exports = UserAccount;