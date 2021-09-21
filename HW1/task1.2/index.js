import fs from 'fs';
const csvtojson = require("csvtojson");

const writeStream = fs.createWriteStream("./bookList.txt", 'UTF-8');


csvtojson().fromFile('./csv/bookList.csv').then((data) => {
        data.map((item) => {
            writeStream.write(`${JSON.stringify(item)}\n\n\n`)
        })
    
    },(err) => {
        console.error(err);
    })