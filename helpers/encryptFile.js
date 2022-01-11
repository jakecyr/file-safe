// @ts-check

const { readFile, writeFile, rm } = require('fs-extra');
const fileExists = require('./fileExists');
const path = require('path');
const CryptoJS = require('crypto-js');

const encryptFile = async (filePath, key, { maintainExt, force, keepSource }) => {
  const fileText = (await readFile(filePath)).toString();
  const cipherText = CryptoJS.AES.encrypt(fileText, key).toString();

  const parentDirectory = filePath.split('/').slice(0, -1).join('/');
  let filename = filePath.split('/').slice(-1)[0];

  if (!maintainExt) {
    filename = filename.split('.')[0];
  }

  const newFilePath = path.join(parentDirectory, filename + '.crypt');
  const fileAlreadyExists = await fileExists(newFilePath);

  if (fileAlreadyExists && !force) {
    throw new Error('File already exists');
  }

  await writeFile(newFilePath, cipherText);

  if (!keepSource) {
    await rm(filePath);
  }
};

module.exports = encryptFile;
