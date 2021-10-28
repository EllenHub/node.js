const { emailService, userService} = require('../services');
const { User, O_Auth } = require('../db/');
const { userNormalizator } = require('../utils/user.util');
const { statusCodes, statusMessage } = require('../configs');
const { WELCOME, UPDATE, DELETE } = require('../consts/email-actions.enum');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers(req.query);

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
            const {email, name} = req.body;

            const newUser = await User.createUserWithHashedPassword(req.body);

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

            await O_Auth.deleteMany({user_id});

            await emailService.sendMail(email, DELETE,{userName: name});

            res.status(statusCodes.deleted).json(statusMessage.deleted);
        } catch (e) {
            next(e);
        }
    }
};
