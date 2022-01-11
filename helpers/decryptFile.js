// @ts-check

const fileExists = require('./fileExists');
const { readFile, writeFile, rm } = require('fs-extra');
const CryptoJS = require('crypto-js');
const path = require('path');

const decryptFile = async (filePath, key, { force, keepSource }) => {
  const fileText = (await readFile(filePath)).toString();

  const bytes = CryptoJS.AES.decrypt(fileText, key);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  const parentDirectory = filePath.split('/').slice(0, -1).join('/');
  const filename = filePath.split('/').slice(-1)[0].split('.').slice(0, -1).join('.');

  const newFilePath = path.join(
    parentDirectory,
    filename.includes('.') ? filename : filename + '.txt'
  );

  const fileAlreadyExists = await fileExists(newFilePath);

  if (fileAlreadyExists && !force) {
    throw new Error('File already exists');
  }

  await writeFile(newFilePath, originalText);

  if (!keepSource) {
    console.log('Deleting source file', filePath);
    await rm(filePath, { force: true });
  }
};

module.exports = decryptFile;
