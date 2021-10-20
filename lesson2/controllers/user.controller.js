const { emailService, passwordService } = require('../services');
const User = require('../db/User');
const { userNormalizator } = require('../utils/user.util');
const { statusCodes, statusMessage } = require('../configs');
const { WELCOME, UPDATE, DELETE } = require('../consts/email-actions.enum');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            const usersToReturn = users.map((item) => userNormalizator(item));

            res.json(usersToReturn);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const {user} = req;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {password, email, name} = req.body;

            const hashedPassword = await passwordService.hash(password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            await emailService.sendMail(email, WELCOME,{userName: name});

            const normalizedNewUser = userNormalizator(newUser);

            res.status(statusCodes.created).json(normalizedNewUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const {email, name} = req.body;

            const updatedUser = await User.findByIdAndUpdate(user_id, req.body, {new: true});

            const userToUpdate = userNormalizator(updatedUser);

            await emailService.sendMail(email, UPDATE,{userName: name});

            res.status(statusCodes.updated).json(userToUpdate);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const {email, name} = req.body;

            await User.findByIdAndRemove(user_id);

            await emailService.sendMail(email, DELETE,{userName: name});

            res.status(statusCodes.deleted).json(statusMessage.deleted);
        } catch (e) {
            next(e);
        }
    }
};
