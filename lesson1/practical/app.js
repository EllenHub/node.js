
// - у вас є масив юзрів (до 10), з такими полями наприклад - const users = [
// //     { name: 'olya', gender: 'female', age: 20 }
// //         ...
// // ], вам потрібно написати метод який створює файлики - де назва файлику - це імя вашого юзера (наприклад - Olya.txt),
// // вміст це сам ваш юзер - { name: 'olya', gender: 'female', age: 20 }
// // перед тим створити 4 папки (програмно) - наприклад - manOlder20, manYounger20, womanOlder20, womanYounger20
// // і розподілити ваших юзерів саме по відповідних папках

const fs = require('fs');
const path = require('path');

const newArr = ['manOlder20', 'manYounger20','womanOlder20', 'womanYounger20'];

newArr.forEach(folder => {
    fs.mkdir(path.join(__dirname, 'lesson1', 'practical', folder), {recursive: true}, err => {
        if(err){
            console.log(err);
        }
    });
});

const users = [
    { name: 'olya', gender: 'female', age: 20 },
    { name: 'petya', gender: 'male', age: 25 },
    { name: 'sasha', gender: 'female', age: 18 },
    { name: 'vasia', gender: 'male', age: 50 },
    { name: 'george', gender: 'male', age: 25 },
    { name: 'climentina', gender: 'female', age: 40 },
    { name: 'direk', gender: 'male', age: 15 },
    { name: 'diana', gender: 'female', age: 15 }
]

users.forEach(item => {
    const fileName = item.name;
    const filePath = path.join(__dirname,'practical','allFiles',fileName + '.txt');
    const oldPath = path.join(__dirname,'practical','allFiles');
    const manOlder20 = path.join(__dirname, 'practical', 'manOlder20', fileName + '.txt');
    const manYounger20 = path.join(__dirname,'practical', 'manYounger20', fileName + '.txt');
    const womanOlder20 = path.join(__dirname,'practical', 'womanOlder20', fileName + '.txt');
    const womanYounger20 = path.join(__dirname,'practical', 'womanYounger20', fileName + '.txt');

    fs.writeFile(filePath, JSON.stringify(item), err => {
    if(err) {
        console.log(err);
    }
    fs.readFile(filePath,(err1, data) => {
        if(err1) {
            console.log(err1);
        }
        const obj = JSON.parse(data.toString())

        if(obj.gender === 'male' && obj.age > 20) {
              fs.rename(filePath, manOlder20, err3 => {
                        if(err3){
                          console.log(err3);
                     }
                    });
        }
        if(obj.gender === 'male' && obj.age < 20) {
            fs.rename(filePath, manYounger20, err4 => {
                if(err4){
                    console.log(err4);
                }
            });
        }
        if(obj.gender === 'female' && obj.age < 20) {
            fs.rename(filePath, womanYounger20, err5 => {
                if(err5){
                    console.log(err5);
                }
            });
        }
        if(obj.gender === 'female' && obj.age > 20) {
            fs.rename(filePath, womanOlder20, err6 => {
                if(err6){
                    console.log(err6);
                }
            });
        }
     });
  });
});