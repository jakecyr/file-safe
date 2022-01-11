// @ts-check

const decryptCommand = require('./decrypt');
const encryptCommand = require('./encrypt');

const commands = [encryptCommand, decryptCommand];

module.exports = commands;
