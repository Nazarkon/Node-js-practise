'use strict';

var reverseData = function reverseData(data) {
  return data.split('').reverse().join('');
};

process.stdin.on("data", function (data) {
  return process.stdout.write(reverseData(data.toString().trim()) + '\n\n\n');
});