const User = require('../db/User');
const {authValidator} = require('../validators/');
const passwordService = require('../services/password.service');
const ErrorHandler = require("../errors/ErrorHandler");
const {userNormalizator} = require('../utils/user.util');

module.exports = {
    isEmailValid: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const userByEmail = await User.findOne({email});

            if (!userByEmail) {
                throw new ErrorHandler('User does not exist', 404);
            }

            await passwordService.compare(password, userByEmail.password);

            const normalizedUser = userNormalizator(userByEmail);

            req.user = normalizedUser;
            next();
        } catch (e) {
            next(e);
        }
    },

    validateLoginData: (req, res, next) => {
        try {
            const {error, value} = authValidator.loginValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler('Email or password is wrong', 401);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },
};
