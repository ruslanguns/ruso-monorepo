#!/usr/bin/env node
const argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('articles', 'starts the fake generator CLI')
  .example(
    '$0 articles -f articles.js -l data -q 25',
    'Generates 25 objects of fake data of articles',
  )
  .alias('f', 'file')
  .nargs('f', 1)
  .describe('f', 'filename to generate [string]')
  .alias('l', 'location')
  .nargs('l', 1)
  .describe('l', 'location where the file will be saved [string]')
  .alias('s', 'skip-remove')
  .boolean('s')
  .describe('s', 'skips the prompt for selecting the ignored fields')
  .alias('q', 'quantity')
  .nargs('q', 1)
  .describe('q', 'number of elements to be generated [number]')
  .alias('v', 'version')
  .help('h')
  .alias('h', 'help')
  .epilog('Author: Ruslan Gonzalez - Copyright 2020').argv;

const inquirer = require('inquirer');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const faker = require('faker');
const fs = require('fs');
const { join } = require('path');
const { randomNumberGenerator } = require('@ruso/common');

const generateArticles = (qty = 100, removeFields = []) => {
  let data = [];
  for (let i = 0; i < qty; i++) {
    const newArticle = {
      id: faker.random.uuid(),
      image: faker.random.image(),
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraphs(
        randomNumberGenerator(6, 12),
        '<br/><br/>',
      ),
      description: faker.commerce.productDescription(),
      author: faker.name.findName(),
      category: faker.hacker.verb(),
      tags: [
        faker.company.catchPhraseAdjective(),
        faker.company.bsAdjective(),
        faker.company.catchPhraseDescriptor(),
      ],
      publishedAt: faker.date.past(1),
    };
    !!removeFields && removeFields.map((field) => delete newArticle[field]);
    data = [...data, newArticle];
  }
  return {
    status: 200,
    message: 'List of articles',
    count: qty,
    data,
  };
};
const removableFields = (entity) => {
  const articleFields = [
    'image',
    'title',
    'content',
    'author',
    'publishedAt',
    'category',
    'description',
    'tags',
  ];
  switch (entity) {
    case 'articles':
    case 'Articles':
      return articleFields;
    default:
      return;
  }
};

/**
 * Fake Data Generator.
 * @param type 'Articles'
 * @param numberOfElements number
 * @param filename string
 * @param fileLocation string
 * @param removeFields string[]
 */
const fakeGenerator = async ({
  type,
  numberOfElements,
  filename,
  fileLocation,
  removeFields = [],
}) => {
  const path = join(process.cwd(), fileLocation);

  // Creamos la carpeta __mock__ si no exist y dentro de ella la carpeta data
  fs.mkdirSync(path, { recursive: true }, (err) => {
    throw new Error(err);
  });

  // Salvamos la data en su sitio
  let data;
  switch (type) {
    case 'articles':
    case 'Articles':
      data = generateArticles(numberOfElements, removeFields);
      break;
    default:
      break;
  }

  fs.writeFileSync(
    join(path, `${filename.toLowerCase()}.json`),
    JSON.stringify(data, null, '\t'),
  );
};

// Prompts validations
const validateFileName = async (input = '') => {
  if (input.length < 2 || input.length > 10)
    return 'the filename must have more than 3 characters and less than 10 characters';
  if (/\s/g.test(input)) return 'the filename should not have whitespaces';
  return true;
};

const validateCustomNumberOfElements = async (input) => {
  if (isNaN(input)) return 'custom number of elements should be a number';
  if (input <= 0 || input > 99999)
    return 'the custom number of elements must have more than 0 characters and less then 99999 characters';
  return true;
};

const validateFileLocation = async (input) => {
  if (/\s/g.test(input)) return 'the file location should not have whitespaces';
  return true;
};

(async () => {
  clear();
  console.log(
    chalk.redBright(
      figlet.textSync('FakeDataMaker', {
        horizontalLayout: 'controlled smushing',
      }),
    ),
    '\n      ',
    chalk.blueBright('Created by'),
    chalk.greenBright('Ruslan Gonzalez'),
    ' | ',
    chalk.blueBright('Twitter'),
    chalk.greenBright('@ruslangonzalez'),
    '\n\n             ---------------------------------------\n\n ',
  );
  const type =
    argv._[0] ??
    (await inquirer
      .prompt({
        name: 'type',
        type: 'list',
        message: 'Choice the fake data type to generate',
        choices: ['Articles'],
      })
      .then((_) => _.type));

  const removeFields =
    !argv.s &&
    (await inquirer
      .prompt({
        name: 'removeFields',
        type: 'checkbox',
        message: 'OPTIONAL - Select the fields you want to be removed',
        choices: removableFields(type),
      })
      .then((_) => _.removeFields));

  let numberOfElements =
    argv.q ??
    (await inquirer
      .prompt({
        name: 'numberOfElements',
        type: 'list',
        message: `How many rows do you want to generate?`,
        choices: [10, 50, 100, 1000, 'Custom'],
        default: 100,
      })
      .then((_) => _.numberOfElements));

  if (numberOfElements === 'Custom') {
    const { customNumberOfElements } = await inquirer.prompt([
      {
        name: 'customNumberOfElements',
        type: 'input',
        message: 'How many elements do you want to generate?',
        validate: validateCustomNumberOfElements,
        default: 20,
      },
    ]);
    numberOfElements = customNumberOfElements;
  }
  const filename =
    argv.f ??
    (await inquirer
      .prompt({
        name: 'filename',
        type: 'input',
        message: 'Please write the filename for JSON file?',
        validate: validateFileName,
        transformer: (a) => {
          return `${a}.json`;
        },
        default: 'data',
      })
      .then((_) => _.filename));

  const fileLocation =
    argv.l ??
    (await inquirer
      .prompt({
        name: 'fileLocation',
        type: 'input',
        message: 'Please write the location where you want to save it.',
        validate: validateFileLocation,
        transformer: (a) => {
          return `${a}/${filename}.json`;
        },
        default: 'assets/data',
      })
      .then((_) => _.fileLocation));

  return { type, numberOfElements, filename, fileLocation, removeFields };
})()
  .then(async (data) => {
    const { confirm } = await inquirer.prompt({
      name: 'confirm',
      type: 'confirm',
      message: `Do you want to continue?`,
    });

    if (confirm) {
      await fakeGenerator(data);
      console.log(chalk.green('\n Fake Data is successfully generated'));
    } else {
      console.log(chalk.red('\n Process finished. No file will be generated'));
    }
  })
  .catch(console.error);
