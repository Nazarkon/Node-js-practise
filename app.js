const { OSInformation } = require('./loggerUserOSVersion');
const { createFile, readFile, findFileByName } = require('./fileSystemOperation');

const userOSInformation = OSInformation();

createFile(userOSInformation);

readFile('OSIfo.txt')

// const files = findFileByName('./', 'OSIfo')

// console.log(files);


