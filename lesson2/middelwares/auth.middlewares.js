const User = require('../db/User');
const { authValidator } = require('../validators/');
const passwordService = require('../services/password.service');
const ErrorHandler = require("../errors/ErrorHandler");
const { userNormalizator } = require('../utils/user.util');
const { statusCodes } = require('../configs');
const { statusMessage } = require('../configs');

module.exports = {
    isEmailValid: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const userByEmail = await User.findOne({email});

            if (!userByEmail) {
                throw new ErrorHandler(statusMessage.isNotValid, statusCodes.inNotValid);
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
                throw new ErrorHandler( statusMessage.isNotValid, statusCodes.inNotValid);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },
};
