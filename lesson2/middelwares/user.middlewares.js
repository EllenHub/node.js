const {Types} = require('mongoose');

const User = require('../db/User');
const ErrorHandler = require("../errors/ErrorHandler");
const {userValidator} = require('../validators/');
const {userNormalizator} = require('../utils/user.util');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userEmail = await User.findOne({email});

            if (userEmail) {
                throw new ErrorHandler('This email is already in use', 409);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserIdPresent: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const isValid = Types.ObjectId.isValid(user_id);

            if (!isValid) {
                throw new ErrorHandler('Id is not valid', 418);
            }

            const userId = await User.findById(user_id);

            if (!userId) {
                throw new ErrorHandler('User not found', 404);
            }

            const normalizedUser = userNormalizator(userId);

            req.user = normalizedUser;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    updateUserBodyValidation: (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const {role} = req.body;

            if (!roleArr.includes(role)) {
                throw new Error('Access denied');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

