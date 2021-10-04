import fs from 'fs';

const csv = require("csvtojson");
 
const readStream=fs.createReadStream("./csv/bookList.csv");
 
const writeStream= fs.createWriteStream("./bookList.txt", 'UTF-8');
 
readStream.pipe(csv()).pipe(writeStream);