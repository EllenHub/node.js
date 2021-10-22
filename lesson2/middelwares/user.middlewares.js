const { Types } = require('mongoose');

const ErrorHandler = require('../errors/ErrorHandler');
const User = require('../db/User');
const { statusCodes, statusMessage } = require('../configs');

module.exports = {
    isUserIdPresent: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const isValid = Types.ObjectId.isValid(user_id);

            if (!isValid) {
                throw new ErrorHandler(statusMessage.isNotValidId, statusCodes.isNotValid);
            }

            const userId = await User.findById(user_id);

            if (!userId) {
                throw new ErrorHandler(statusMessage.notFound, statusCodes.notFound);
            }

            req.user = userId;
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
            const {role} = req.user;

            if (!roleArr.includes(role)) {
                throw new ErrorHandler(statusMessage.deniedAccess, statusCodes.forbidden);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

