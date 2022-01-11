// @ts-check

const { stat } = require('fs-extra');
const prompt = require('prompt-sync')({ sigint: true });
const fileExists = require('../helpers/fileExists');
const findFiles = require('../helpers/findFiles');
const encryptFile = require('../helpers/encryptFile');

const encryptCommand = (commander) => {
  commander
    .command('encrypt [fileOrFolder]')
    .option('-k, --key <key>', 'The key to use for encryption')
    .option('-s, --keep-source', 'Keep the source file')
    .option('-f, --force', 'Blow through any red tape')
    .option('-m, --maintain-ext', 'Maintain the file extension of the source file')
    .option('-e, --ext <exts>', 'Encrypt all files with the specified ext')
    .action(async (fileOrFolder, { key, keepSource, maintainExt, force, ext }) => {
      while (!key) {
        key = prompt.hide('Enter a password: ');
      }

      if (!(await fileExists(fileOrFolder))) {
        console.error(`File or folder ${fileOrFolder} does not exist`);
        process.exit(1);
      }

      const stats = await stat(fileOrFolder);
      const isDirectory = stats.isDirectory();

      if (isDirectory) {
        const files = await findFiles(ext ? `${fileOrFolder}/**/*.${ext}` : `${fileOrFolder}/**/*`);

        await Promise.all(
          files.map((file) => encryptFile(file, key, { maintainExt, force, keepSource }))
        );
      } else {
        await encryptFile(fileOrFolder, key, {
          maintainExt,
          force,
          keepSource,
        });
      }
    });
};

module.exports = encryptCommand;
