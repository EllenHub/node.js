// LESSON 1 (fs)
// sort out files by gender from one folder to another


const fs = require('fs');
const path = require('path');


const dirPathBoys = path.join(__dirname, 'lesson1', 'homework', 'boys');
const dirPathGirls = path.join(__dirname, 'lesson1', 'homework', 'girls')

fs.mkdir(dirPathBoys, {recursive: true}, err => {
    if(err) {
        console.log(err);
    }})

fs.mkdir(dirPathGirls,{recursive: true}, err => {
    if(err) {
        console.log(err);
    }})


function sortFiles(dirPathBoys){
    fs.readdir(dirPathBoys, (err, files) => {
            if(err) {
                console.log(err)
            }
            files.forEach(file => {
                const oldFilePath = path.join(dirPathBoys, file)
                const newFilePath = path.join(dirPathGirls, file)
                console.log(file);

                fs.readFile(oldFilePath, (err1, data) => {
                    if(err1) {
                        console.log(err1)
                    }
                    const objData = data.toString()
                    const objParsed = JSON.parse(objData)
                    console.log(objParsed);
                    if(objParsed.gender === 'female') {
                        fs.rename(oldFilePath, newFilePath, err2 => {
                            if(err2){
                                console.log(err2)
                            }
                        })
                    }
                })
            })
 })
}

console.log(sortFiles());








