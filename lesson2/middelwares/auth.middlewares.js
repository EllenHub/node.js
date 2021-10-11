const User = require('../db/User');
const authValidator = require('../validators/auth.validator');
const passwordService = require('../services/password.service');
const {userNormalizator} = require('../utils/user.util');

module.exports = {
    isEmailValid: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const userByEmail = await User.findOne({email});

            if (!userByEmail) {
                throw new Error('User does not exist');
            }

            await passwordService.compare(password, userByEmail.password);

            const normalizedUser = userNormalizator(userByEmail);

            req.user = normalizedUser;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    validateLoginData: (req, res, next) => {
        try {
            const {error, value} = authValidator.loginValidator.validate(req.body);

            if (error) {
                throw new Error ('Email or password is wrong');
            }

            req.body = value;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },
};
