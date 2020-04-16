'use strict';

const Helpers = use('Helpers');

const fs = require('fs');

const readFile = Helpers.promisify(fs.readFile)


const base64_encode = (file) => {
  const bitmap = fs.readFileSync(file);
  return new Buffer(bitmap).toString('base64');
}

const getDir = (path) => {
  return new Promise((resolve, reject) => { 
    fs.readdir(path, (e, templates) => {
      e ? reject(e) : resolve(templates);
    }) 
  })
}

module.exports = { base64_encode, getDir, readFile };