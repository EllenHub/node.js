// LESSON 1 (fs)
// sort out files by gender from one folder to another

const fs = require('fs');
const path = require('path');

const dirPathBoys = path.join(__dirname, 'lesson1', 'homework', 'boys');
const dirPathGirls = path.join(__dirname, 'lesson1', 'homework', 'girls')        // TODO додай ";"

fs.mkdir(dirPathBoys, {recursive: true}, err => {
    if(err) {
        console.log(err);
    }})

fs.mkdir(dirPathGirls,{recursive: true}, err => {
    if(err) {
        console.log(err);
    }})
                                                                                 // TODO в цьому рядку ентер без потреби, більше ніж один підряд не с тав

function sortFiles(dirPathBoys){
    fs.readdir(dirPathBoys, (err, files) => {
            if(err) {
                console.log(err)                                                 // TODO додай ";"
            }                                                                    // TODO після цього рядка ентер
            files.forEach(file => {
                const oldFilePath = path.join(dirPathBoys, file)                 // TODO додай ";"
                const newFilePath = path.join(dirPathGirls, file)                // TODO додай ";"
                console.log(file);

                fs.readFile(oldFilePath, (err1, data) => {
                    if(err1) {
                        console.log(err1)                                        // TODO додай ";"
                    }                                                            // TODO після цього рядка ентер
                    const objData = data.toString()                              // TODO додай ";"
                    const objParsed = JSON.parse(objData)                        // TODO додай ";"
                    console.log(objParsed);                                      // TODO видаляй зайві логи
                    if(objParsed.gender === 'female') {                          // TODO 'female' -> динамічним роби
                        fs.rename(oldFilePath, newFilePath, err2 => {
                            if(err2){
                                console.log(err2)                                // TODO додай ";"
                            }
                        })                                                       // TODO додай ";"
                    }
                })                                                               // TODO додай ";"
            })                                                                   // TODO додай ";"
 })                                                                              // TODO додай ";"
}

sortFiles(dirPathBoys);   // TODO передавай ще параменри щоб зробити функцію динамічною. для коректної роботи тобі потіьен "шлях читання", "стать", "шлях куди буде записаний чувак у разі співпадіння гендеру"
sortFiles(dirPathGirls);  // TODO ...
