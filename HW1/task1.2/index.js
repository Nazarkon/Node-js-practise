import fs from 'fs';
import { pipeline } from 'stream';


const csv = require("csvtojson");
 
const readStream=fs.createReadStream("./csv/bookList.csv");
 
const writeStream= fs.createWriteStream("./bookList.txt", 'UTF-8');
 
readStream.pipe(csv()).pipe(writeStream);