const { stat } = require('fs-extra');

const fileExists = async (filePath) => {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = fileExists;
