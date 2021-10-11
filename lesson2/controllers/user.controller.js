const User = require('../db/User');
const passwordService = require('../services/password.service');
const { userNormalizator } = require('../utils/user.util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();

            const usersToReturn = users.map((item) => userNormalizator(item));

            res.json(usersToReturn);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserById: (req, res) => {
        try {
            const {user} = req;

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const {password} = req.body;

            const hashedPassword = await passwordService.hash(password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            const normalizedNewUser = userNormalizator(newUser);

            res.json(normalizedNewUser);
        } catch (err) {
            res.json(err.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {user_id} = req.params;

            const newData = req.body;

            const updatedUser = await User.findByIdAndUpdate(user_id, newData);

            const userToUpdate = userNormalizator(updatedUser);

            res.json(userToUpdate);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;

            await User.findByIdAndRemove(user_id);

            res.sendStatus(204);
        } catch (e) {
            res.json(e.message);
        }
    }
};
