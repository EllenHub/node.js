const User = require('../db/User');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            res.json(e);
        }
    },

    getUserById: async (req, res) => {
        const {user_id} = req.params;

        const user = await User.findById(user_id);

        res.json(user);
    },

    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);

            res.json(newUser);
        } catch (err) {
            res.json(err);
        }
    },

    updateUser: (req, res) => {
        res.json('Update a user');
    },

    deleteUser: async (req, res) => {
        const deleteUser = await User.deleteOne(req.body);

        res.json(deleteUser);
    }
};
