const { Schema, model } = require('mongoose');

const { userRolesEnum } = require('../consts');
const { userModelEnum } = require('../consts');

const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        default: userRolesEnum.USER,
        enum: Object.values(userRolesEnum)
    }
}, {timestamps: true});

module.exports = model(userModelEnum.USER, userSchema);

