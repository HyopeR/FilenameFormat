const fs = require('fs');
const readline = require('readline');

/**
 * @param args
 * @returns {string}
 */
const pathJoin = (...args) => args.join('/');

/**
 * @param text
 * @returns {string}
 */
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

/**
 * @type {Interface}
 */
const readlineManager = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * @param question
 * @returns {Promise<string[]>}
 */
const execAsyncQuestion = (question) => {
  return new Promise((resolve) => {
    readlineManager.question(question, value => {
      resolve(value.split(' ').filter(field => field));
      readlineManager.close();
    });
  });
};

/**
 * @param dir
 */
const createFolderIfNotExist = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
};

module.exports = {
  pathJoin,
  capitalize,
  readlineManager,
  execAsyncQuestion,
  createFolderIfNotExist,
}
