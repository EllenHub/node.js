const Joi = require('joi');

const { PASSWORD_REGEXP, EMAIL_REGEXP } = require('../consts/regex');
const userRoles = require('../consts/user-roles.enum');

const createUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .required()
        .trim(),
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required(),
    role: Joi
        .string()
        .allow(...Object.values(userRoles))
});

const updateUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim(),
    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .trim()
});

module.exports = {
    createUserValidator,
    updateUserValidator
};


