const fs = require('fs');
const path = require('path');

const createFile = (data) => {
    fs.writeFile('OSIfo.txt', JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
        console.log('Saved');
    })
}

const readFile = (file) => {
    fs.readFile(file, (err, data) => {
        if (err) throw err;
        console.log(JSON.parse(data))
    })
}

const findFileByName =  async (dir,name) => {
    try {
        const files = await readdir(dir);
        for (const file of files)
          console.log(file);
      } catch (err) {
        console.error(err);
      }
    // console.log(dir, 'dir');
    // console.log(name, 'name');
    // const matchFiles = [];

    // const files =  fs.readdir(dir);

    // console.log(files)

    // for(const file of files) {
    //     const filename = path.parse(file).name;

    //     if (filename === name) {
    //         matchFiles.push(file);
    //     }
    // }

    // return matchFiles;
}

module.exports = {
    createFile,
    readFile,
    findFileByName,
}