"use strict";
console.clear();

const fs = require("fs");
const path = require("path");

const folderName = "photo_result";
const target = path.resolve(__dirname, "..");
const resultFolderDir = path.resolve(target, folderName);
//const jan = path.join(resultFolder, "jan");

const mkFolder = (target, dir) => {
  if (fs.existsSync(target)) {
    fs.mkdirSync(dir);
  }
};

//mkFolder(target, resultFolderDir);
//이미 폴더가 있는 경우에 에러 => 해결 필요
