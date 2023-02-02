const readline = require('readline');
const { OSInformation } = require('./loggerUserOSVersion');
const { createFile, readFile, findFileByName } = require('./fileSystemOperation');

const { stdin, stdout } = require('process');

const input = stdin;
const output = stdout;

const rl = readline.createInterface({ input, output });

const checkValue = (pickedValue) => {
    switch(pickedValue.trim()) {
        case '1' : 
            OSInformation()
            break;
        case '2' : 
            console.log('2')
            break;
        case '3' : 
            console.log('3')
            break;
    }
}

rl.question('Choose your pass! Press Enter:', (answer) => {
    
    console.log('1 - Get your OS Information \n' +
    '2 - Write information to File \n' +
    '3 - Read information from File \n' +
    '4 - Close \n')
    
    checkValue(answer);
});

