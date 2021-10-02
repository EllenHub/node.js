// LESSON 1 (fs)
// sort out files by gender from one folder to another

const fs = require('fs');
const path = require('path');

const dirPathBoys = path.join(__dirname, 'lesson1', 'homework', 'boys');
const dirPathGirls = path.join(__dirname, 'lesson1', 'homework', 'girls');

// Iterating an array for creating 2 folders on the same level ---->

// const arr = ["folder1", "folder2"]
//
// arr.forEach(folder => {
//     fs.mkdir(path.join(__dirname, folder), {recursive: true}, err => {
//         if (err) {
//             console.log(err);
//         }
//     })
// })

fs.mkdir(dirPathBoys, {recursive: true}, err => {
    if (err) {
        console.log(err);
    }
});

fs.mkdir(dirPathGirls, {recursive: true}, err => {
    if (err) {
        console.log(err);
    }
});

function sortFiles(readPath, gender, moveToNewPath) {
    fs.readdir(readPath, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(file => {
            const oldFilePath = path.join(readPath, file);
            const newFilePath = path.join(moveToNewPath, file);

            fs.readFile(oldFilePath, (err1, data) => {
                if (err1) {
                    console.log(err1);
                    return;
                }

                const objData = JSON.parse(data.toString());

                if (objData.gender === gender) {
                    fs.rename(oldFilePath, newFilePath, err2 => {
                        if (err2) {
                            console.log(err2);
                        }
                    });
                }
            });
        });
    });
}

sortFiles(dirPathBoys, "female", dirPathGirls);
sortFiles(dirPathGirls, "male", dirPathBoys);








