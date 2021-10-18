const User = require('../db/User');
const { passwordService } = require('../services');
const { userNormalizator } = require('../utils/user.util');
const { statusCodes, statusMessage } = require('../configs');

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
            const {password} = req.body;

            const hashedPassword = await passwordService.hash(password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            const normalizedNewUser = userNormalizator(newUser);

            res.status(statusCodes.created).json(normalizedNewUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const newData = req.body;

            const updatedUser = await User.findByIdAndUpdate(user_id, newData);

            const userToUpdate = userNormalizator(updatedUser);

            res.status(statusCodes.updated).json(userToUpdate);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            await User.findByIdAndRemove(user_id);

            res.status(statusCodes.deleted).json(statusMessage.deleted);
        } catch (e) {
            next(e);
        }
    }
};
