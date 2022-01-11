// @ts-check

const { stat } = require('fs-extra');
const prompt = require('prompt-sync')({ sigint: true });
const fileExists = require('../helpers/fileExists');
const findFiles = require('../helpers/findFiles');
const decryptFile = require('../helpers/decryptFile');

const decryptCommand = (commander) => {
  commander
    .command('decrypt [fileOrFolder]')
    .option('-k, --key <key>', 'The key to use for encryption')
    .option('-s, --keep-source', 'Keep the source file')
    .option('-f, --force', 'Blow through any red tape')
    .action(async (fileOrFolder, { key, force, keepSource = false }) => {
      if (!(await fileExists(fileOrFolder))) {
        console.error(`File or folder ${fileOrFolder} does not exist`);
        process.exit(1);
      }

      while (!key) {
        key = prompt.hide('Enter the password: ');
      }

      const stats = await stat(fileOrFolder);
      const isDirectory = stats.isDirectory();

      if (isDirectory) {
        const files = await findFiles(`${fileOrFolder}/**/*.crypt`);
        await Promise.all(files.map((file) => decryptFile(file, key, { force, keepSource })));
      } else {
        await decryptFile(fileOrFolder, key, {
          force,
          keepSource,
        });
      }
    });
};

module.exports = decryptCommand;
