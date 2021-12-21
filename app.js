"use strict";
console.clear();

import { existsSync, mkdir, stat, readdir, rename } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const originPathName = "photo_data";
const resultPathName = "photo_result";
const location = path.resolve(__dirname, "..");
const originPath = path.resolve(location, originPathName);
const resultPath = path.resolve(location, resultPathName);

const folders = {
  video: [".mp4", ".mov"],
  captured: [".png", ".aae"],
  duplicated: function (fileName) {
    const idx = fileName.indexOf("_");
    if (fileName.substr(idx + 1, 1) === "E") {
      return true; // 수정된파일
    } else {
      return false; // 수정되지 않은 파일
    }
  },
};

const mvFiles = (fileName, fileInfo) => {
  const birthMonth = new Date(fileInfo.birthtime).getMonth() + 1;
  const ext = path.extname(fileName);

  //월별 폴더로 이동
  readdir(resultPath, (err, monthFolder) => {
    for (let i = 0; i < monthFolder.length; i++) {
      if (birthMonth == monthFolder[i].split("_")[0]) {
        //확장자에 따른 파일 구분
        for (let folder in folders) {
          if (folder === "video" || folder === "captured") {
            folders[folder].map((item) => {
              if (ext === item) {
                rename(
                  path.join(originPath, fileName),
                  path.join(resultPath, monthFolder[i], folder, fileName),
                  (err) => {
                    if (err) throw err;
                  }
                );
              }
            });
            continue;
          }
          if (folder === "duplicated") {
            const isEditing = folders[folder](fileName);
            if (isEditing) {
              rename(
                path.join(originPath, fileName),
                path.join(resultPath, monthFolder[i], fileName),
                (err) => {
                  if (err) throw err;
                }
              );
            } else {
              rename(
                path.join(originPath, fileName),
                path.join(resultPath, monthFolder[i], folder, fileName),
                (err) => {
                  if (err) throw err;
                }
              );
            }
          }
        }
      }
    }
  });
};

const mkFolder = (dir) => {
  const isExists = existsSync(dir);
  if (!isExists) {
    mkdir(dir, () => {
      console.log(`${dir}가 생성되었습니다.`);
    });
  }
};

const init = () => {
  // 폴더 생성
  mkFolder(resultPath);

  for (let i = 0; i < 12; i++) {
    const month = `${i + 1}_${monthNames[i].substr(0, 3)}`;
    const monthPath = path.resolve(resultPath, month);
    mkFolder(monthPath);
    mkFolder(path.resolve(monthPath, "video"));
    mkFolder(path.resolve(monthPath, "captured"));
    mkFolder(path.resolve(monthPath, "duplicated"));
  }

  // 디렉토리 & 파일정보 추출하기
  readdir(originPath, (error, filelist) => {
    for (let i in filelist) {
      stat(path.join(originPath, filelist[i]), (err, stats) => {
        mvFiles(filelist[i], stats);
      });
    }
  });
};

init();
