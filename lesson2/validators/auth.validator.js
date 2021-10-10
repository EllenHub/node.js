const Joi = require('joi');

const { PASSWORD_REGEXP, EMAIL_REGEXP } = require('../configs/consts/regex');

const loginValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .required(),
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required()
});

module.exports = {
    loginValidator
};
