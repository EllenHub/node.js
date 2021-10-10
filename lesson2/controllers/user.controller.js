const User = require('../db/User');
const passwordService = require('../services/password.service');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);
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
            const hashedPassword = await passwordService.hash(req.body.password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            res.json(newUser);
        } catch (err) {
            res.json(err.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            const newData = req.body;

            const updatedUser = await User.findByIdAndUpdate(user_id, newData);

            res.json(updatedUser);
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
