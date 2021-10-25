const {AUTHORIZATION} = require('../consts/regex');
const {authValidator} = require('../validators/');
const {ActionToken, O_Auth, User} = require('../db');
const {passwordService, jwtService} = require('../services');
const ErrorHandler = require('../errors/ErrorHandler');
const {userNormalizator} = require('../utils/user.util');
const {statusCodes, statusMessage} = require('../configs');
const {tokenTypeEnum} = require('../consts');

module.exports = {
    isDataValid: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const userByEmail = await User.findOne({email});

            if (!userByEmail) {
                throw new ErrorHandler(statusMessage.isNotValid, statusCodes.isNotValid);
            }

            await passwordService.compare(password, userByEmail.password);

            const normalizedUser = userNormalizator(userByEmail);

            req.user = normalizedUser;
            next();
        } catch (e) {
            next(e);
        }
    },
    isEmailValid: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User.findOne({email});

            if (!userByEmail) {
                throw new ErrorHandler(statusMessage.isNotValid, statusCodes.isNotValid);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateLoginData: (req, res, next) => {
        try {
            const {error, value} = authValidator.loginValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusMessage.isNotValid, statusCodes.isNotValid);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },
    authResetPasswordValidator: (req, res, next) => {
        try {
            const {error, value} = authValidator.authPasswordValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusMessage.isNotValid, statusCodes.isNotValid);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            await jwtService.verifyToken(token, tokenTypeEnum.ACCESS);

            if (!token) {
                throw new ErrorHandler(statusCodes.invalidToken, statusMessage.invalidToken);
            }


            const tokenResponse = await O_Auth.findOne({access_token: token});

            if (!tokenResponse) {
                throw new ErrorHandler(statusCodes.invalidToken, statusMessage.invalidToken);
            }

            req.user = tokenResponse.user_id;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            await jwtService.verifyToken(token, tokenTypeEnum.REFRESH);

            if (!token) {
                throw new ErrorHandler(statusCodes.invalidToken, statusMessage.invalidToken);
            }

            const tokenResponse = await O_Auth.findOne({refresh_token: token});

            if (!tokenResponse) {
                throw new ErrorHandler(statusCodes.invalidToken, statusMessage.invalidToken);
            }

            await O_Auth.deleteOne({refresh_token: token});

            req.user = tokenResponse.user_id;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkActiveToken: async (req, res, next) => {
        try {
            const actionToken = req.get(AUTHORIZATION);

            if (!actionToken) {
                throw new ErrorHandler(statusCodes.invalidToken, statusMessage.invalidToken);
            }

            await jwtService.verifyToken(actionToken, tokenTypeEnum.ACTION);

            const actionResponse = await ActionToken.findOne({token: actionToken});

            if (!actionResponse) {
                throw new ErrorHandler(statusCodes.invalidToken, statusMessage.invalidToken);
            }

            await ActionToken.deleteOne({token: actionToken});

            req.user = actionResponse.user_id;
            next();
        } catch (e) {
            next(e);
        }
    },
};
