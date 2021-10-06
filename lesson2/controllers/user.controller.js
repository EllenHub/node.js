const { readUsers, writeData } = require ('../services/user.services')

module.exports = {
    getUsers: async (req, res) => {
        const objData = await readUsers();
        res.json(objData);
    },

    getUserById: async (req, res) => {
        const {user_id} = req.params;
        const users = await readUsers();
        const user = users[user_id - 1];

        if(!user) {
            res.status(404).json('User is not found');
            return;
        }
        res.json(user);
    },

    createUser: async (req, res) => {
          const user = req.body;
          const objData = await readUsers();

          objData.push({...user, id: objData.length + 1});
            await writeData(objData);
            res.json('New user has been created');
        },

    updateUser: (req, res) => {
        res.json('Update a user');
    },

    deleteUser: async (req, res) => {
        const {user_id} = req.params;
        const users = await readUsers();
        const user = users[user_id - 1];

        if (user !== -1) {
            users.splice(user, 1);
           return res.json('User Deleted');
        } else {
            res.json('User NOT Found');
        }
    }
};