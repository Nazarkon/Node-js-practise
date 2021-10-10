'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _stream = require('stream');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var csv = require("csvtojson");

var readStream = _fs2.default.createReadStream("./csv/bookList.csv");

var writeStream = _fs2.default.createWriteStream("./bookList.txt", 'UTF-8');

readStream.pipe(csv()).pipe(writeStream);

// const csvStr = csvtojson().fromFile('./csv/bookList.csv').then((data) => {
//         data.map((item) => {
//             writeStream.write(`${JSON.stringify(item)}\n\n\n`)
//         })

//     },(err) => {
//         console.error(err);
//     })