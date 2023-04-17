const fs = require('fs');
const {
  pathJoin,
  capitalize,
  execAsyncQuestion,
  createFolderIfNotExist,
} = require('./utils');

const init = async () => {
  const root = __dirname;
  const folders = await execAsyncQuestion('Enter the destination folder names; ')
  const ext = await execAsyncQuestion('Enter the extension [Default: svg]; ')

  const newDir = pathJoin(root, 'new')
  createFolderIfNotExist(newDir)

  folders.forEach(folderName => {
    const outputDir = pathJoin(newDir, folderName);
    createFolderIfNotExist(outputDir)
    const inputDir = pathJoin(root, folderName);

    const files = fs.readdirSync(inputDir);
    files.forEach(fileName => {
      const fileInputPath = pathJoin(inputDir, fileName);
      const file = fs.readFileSync(fileInputPath, 'utf8');

      const newFileName = fileName
        .replace(`.${ext}`, '')
        .split('-')
        .map(p => capitalize(p))
        .join('-')
        .concat(`.${ext}`);

      const fileOutputPath = pathJoin(outputDir, newFileName);

      fs.writeFileSync(fileOutputPath, file);
    })
  })
}

init();
