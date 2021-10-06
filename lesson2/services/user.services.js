const path = require('path');
const fs = require ('fs');
const util = require ('util')

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const filePath = path.join(__dirname, '../db', 'users.json.txt');
console.log(filePath);

const readUsers = async () => {
        const data = await readFilePromise(filePath);

         const parsedData = JSON.parse(data.toString())
         return parsedData ;
}
// readUsers('process.cwd()').catch(err => {
//     console.log(err) } )

const writeData = async (users) => {
        const usersData = JSON.stringify(users);
        await writeFilePromise(filePath, usersData)
}
module.exports = {readUsers, writeData};