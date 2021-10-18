const { Types } = require('mongoose');

const ErrorHandler = require('../errors/ErrorHandler');
const User = require('../db/User');
const { userNormalizator } = require('../utils/user.util');
const { statusCodes, statusMessage } = require('../configs');


module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userEmail = await User.findOne({email});

            if (userEmail) {
                throw new ErrorHandler(statusMessage.existEmail, statusCodes.alreadyExists);
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
                throw new ErrorHandler(statusMessage.isNotValidId, statusCodes.inNotValid);
            }

            const userId = await User.findById(user_id);

            if (!userId) {
                throw new ErrorHandler(statusMessage.notFound, statusCodes.notFound);
            }

            const normalizedUser = userNormalizator(userId);

            req.user = normalizedUser;
            next();
        } catch (e) {
            next(e);
        }
    },
    isEmailUnique: async (req, res, next) => {
        try{
            const {email} = req.body;

            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new ErrorHandler(statusMessage.existEmail, statusCodes.alreadyExists);
            }

            next();
        } catch(e) {
            next(e);
        }
    },

    userBodyValidation: (userValidator) => (req, res, next) => {
        try {
            const {error, value} = userValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, statusCodes.isNotValid);
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
                throw new ErrorHandler(statusMessage.deniedAccess, statusCodes.forbidden);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

