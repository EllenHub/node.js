const {Types} = require('mongoose');

const User = require('../db/User');
const userValidator = require('../validators/user.validator');
const { userNormalizator } = require('../utils/user.util');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userEmail = await User.findOne({email});

            if (userEmail) {
                throw new Error('This email already exists');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserIdPresent: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const isValid = Types.ObjectId.isValid(user_id);

            if (!isValid) {
                throw new Error('Id is not valid');
            }

            const userId = await User.findById(user_id);

            if (!userId) {
                throw new Error('User not found');
            }

            const normalizedUser = userNormalizator(userId);

            req.user = normalizedUser;
            next();
        } catch (e) {
            res.json(e.message);
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
            res.json(e.message);
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
            res.json(e.message);
        }
    }
};

