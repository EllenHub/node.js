
// - у вас є масив юзрів (до 10), з такими полями наприклад - const users = [
// //     { name: 'olya', gender: 'female', age: 20 }
// // ], вам потрібно написати метод який створює файлики - де назва файлику - це імя вашого юзера (наприклад - Olya.txt),
// // вміст це сам ваш юзер - { name: 'olya', gender: 'female', age: 20 }
// // перед тим створити 4 папки (програмно) - наприклад - manOlder20, manYounger20, womanOlder20, womanYounger20
// // і розподілити ваших юзерів саме по відповідних папках

const fs = require('fs');
const path = require('path');

const users = require('./veriables');

const newArr = ['manOlder20', 'manYounger20','womanOlder20', 'womanYounger20'];

newArr.forEach(folder => {
    fs.mkdir(path.join(__dirname, 'lesson1', 'practical', folder), {recursive: true}, err => {
        if(err){
            console.log(err);
        }
    });
});

const rename = (oldPath, newPath) => {
    fs.rename(oldPath, newPath, error => {
        if(error){
            console.log(error);
        }
    });
}

users.forEach(item => {
    const fileName = item.name;
    const filePath = path.join(__dirname,'allFiles',fileName + '.txt');
    const manOlder20 = path.join(__dirname, 'manOlder20', fileName + '.txt');
    const manYounger20 = path.join(__dirname, 'manYounger20', fileName + '.txt');
    const womanOlder20 = path.join(__dirname, 'womanOlder20', fileName + '.txt');
    const womanYounger20 = path.join(__dirname, 'womanYounger20', fileName + '.txt');

    fs.writeFile(filePath, JSON.stringify(item), err => {
    if(err) {
        console.log(err);
        return;
    }
    fs.readFile(filePath,(err1, data) => {
        if(err1) {
            console.log(err1);
            return;
        }
        const obj = JSON.parse(data.toString())

        if(obj.gender === 'male' && obj.age > 20) {
            rename(filePath,manOlder20);
              // fs.rename(filePath, manOlder20, err3 => {
              //           if(err3){
              //             console.log(err3);
              //        }
              //       })
            return;
        }

        if(obj.gender === 'male' && obj.age < 20) {
            rename(filePath, manYounger20);
            return;
        }

        if(obj.gender === 'female' && obj.age < 20) {
            rename(filePath, womanYounger20);
            return;
        }

        if(obj.gender === 'female' && obj.age > 20) {
            rename(filePath,womanOlder20);
        }
     });
  });
});