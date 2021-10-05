const fs = require('fs');
const path = require('path');

const db = require('../db/users');

const filePath = path.join(__dirname, '../db', 'users.json.txt');

module.exports = {
    getUsers: (req, res) => {
        res.json(db)
    },
    getUserById: (req, res) => {
        const {user_id} = req.params;
        const user = db[user_id - 1]
        if (!user) {
            res.status(404).json('User is not found')
            return;
        }
        res.json(user)
    },
    createUser: (req, res) => {
        const user = req.body;

        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            const objData = JSON.parse(data.toString());

            objData.push({...user, id: objData.length + 1});
            fs.writeFile(filePath, JSON.stringify(objData), err1 => {
                if (err1) {
                    console.log(err1);
                }
            });
            res.json('New user created')
        });

    },
    updateUser: (req, res) => {
        res.json('Update a user')
    },
    deleteUser: (req, res) => {
        const {user_id} = req.params
        const user = db[user_id - 1]

        if (user !== -1) {
            db.splice(user, 1);
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    }
};