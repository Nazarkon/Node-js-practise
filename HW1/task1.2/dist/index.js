"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var csvtojson = require("csvtojson");

var writeStream = _fs2.default.createWriteStream("./bookList.txt", 'UTF-8');

csvtojson().fromFile('./csv/bookList.csv').then(function (data) {
    data.map(function (item) {
        writeStream.write(JSON.stringify(item) + "\n\n\n");
    });
}, function (err) {
    console.error(err);
});