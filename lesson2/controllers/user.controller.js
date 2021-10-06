const  {readUsers,writeData}= require ('../services/user.services')

module.exports = {
    getUsers: (req, res) => {

    },
    getUserById: (req, res) => {
        const {user_id} = req.params;
        // const user = db[user_id - 1]
        // if (!user) {
        //     res.status(404).json('User is not found')
        //     return;
        // }
        res.json('getUser')
    },
    createUser: async (req, res) => {
          const user = req.body;

          const objData = await readUsers();
console.log(objData);
          objData.push({...user, id: objData.length + 1});
            await writeData(objData)

            res.json('New user has been created', objData)
        },

    updateUser: (req, res) => {
        res.json('Update a user')
    },
    deleteUser: (req, res) => {
        // const {user_id} = req.params
        // const user = db[user_id - 1]
        //
        // if (user !== -1) {
        //     db.splice(user, 1);
        //     res.status(204).send();
        // } else {
        //     res.status(404).send();
        // }
    }
};