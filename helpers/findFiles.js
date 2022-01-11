const glob = require('glob');

const findFiles = (search) =>
  new Promise((resolve, reject) => {
    glob(search, (err, matches) => {
      if (err) {
        reject(err);
      } else {
        resolve(matches);
      }
    });
  });

module.exports = findFiles;
