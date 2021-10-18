const Joi = require('joi');

const { PASSWORD_REGEXP, EMAIL_REGEXP } = require('../consts/regex');
const { userRolesEnum }= require('../consts');

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
        .allow(...Object.values(userRolesEnum))
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


