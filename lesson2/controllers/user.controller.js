const User = require('../db/User');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find(req.body);

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
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            res.json(err.message);
        }
    },

    deleteUser: (req, res) => {
        try{
            res.json(req.user);
        } catch (e) {
            res.json(e.message);
        }
    }

};
