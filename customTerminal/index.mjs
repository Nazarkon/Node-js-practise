import inquirer from "inquirer";

inquirer
  .prompt([
    {
      type: 'list',
      name: 'surveyAnswer',
      message: 'Dou you want to take a survey',
      default: '[y/N]',
      choices: [
        'Yes',
        'No'
      ]
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      default: 'Bob',
      when: (answers) => answers.surveyAnswer === 'Yes'
    },
    {
      type: 'input',
      name: 'surname',
      message: 'What is your surname?',
      default: 'Bobson',
      when: (answers) => answers.surveyAnswer === 'Yes'
    },
    {
      type: 'input',
      name: 'age',
      message: 'How old are you?',
      default: '29',
      when: (answers) => answers.surveyAnswer === 'Yes'
    },
    {
      type: 'input',
      name: 'place',
      message: 'Where do you live?',
      default: 'Lviv',
      when: (answers) => answers.surveyAnswer === 'Yes'
    },
    {
      type: 'input',
      name: 'jobTitle',
      message: 'Where is your job title?',
      default: 'FE',
      when: (answers) => answers.surveyAnswer === 'Yes'
    },
  ])
  .then(answers => {
    if(answers.surveyAnswer === 'No') {
      console.log('See you next time!!!!')
    }

    console.table(answers);
  });