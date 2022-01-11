#!/usr/bin/env node
// @ts-check

const commander = require('commander/index');
const commands = require('./commands/index');

for (const command of commands) {
  command(commander);
}

commander.parse(process.argv);
