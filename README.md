<br>

## 사진 폴더 정리 (Node.js)

<br>

### 요구사항 분석

1. photo 폴더 안에 달별로 사진을 관리하고 싶다.
2. 사진과 동영상의 정리가 필요하다. (필요없는 파일은 폴더로 관리한다.)
3. **video** 폴더에는 동영상, **captured** 폴더에는 스크린샷을 관리할 것이다.
4. 만약 보정한 사진이 있다면 중복된 원본사진은 **duplicated** 폴더로 관리한다.

<br>

### Detail

> <br>
> video 폴더 안에는 .mp4 타입이나 .mov 확장자를 가진 파일들을 넣는다. <br><br>
> captured 폴더 안에는 .png, .aae 확장자를 가진 파일들을 넣는다. <br>
> (안드로이드, 아이폰은 .png 타입으로 사진이 저장된다. <br>
> 아이폰에서 사진 편집하면 aae 타입의 파일이 생성된다.) <br><br>
> duplicated 폴더 안에는 수정된 사진이 있다면 원본 사진들을 넣는다. <br>
> 아이폰에서 사진을 편집하거나 보정하면 파일이름에 E가 붙는다. <br>
> ex) IMG_0710 --> IMG_E0710 <br>
> <br>

<br><br>

<hr>
<br>

### 해결 과정

1. 환경 세팅
2. photo_result 폴더를 생성한다.
3. 월별 폴더를 생성한다. ( 1_Jan to 12_Dec )
4. 월별폴더 안에 video, captured, duplicated 폴더를 생성한다.
5. photo_data 폴더 안에 있는 사진들의 날짜정보들을 알아낸다.
6. 각 날짜 정보에 따라 월별 폴더에 넣는다.
7. video 폴더 : .mp4 타입이나 .mov 확장자 <br>
   captured 폴더 : .png, .aae 확장자 <br>
   duplicated 폴더 : 수정된 사진이 있다면 원본 사진들을 넣는다. <br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(편집하거나 보정하면 파일이름에 E가 붙는다.)

<br><br>

### 1. Setting

photo repository 생성<br>
clone ———— .git<br>
[readme.md](http://readme.md) 작성<br>
npm init --yes 각 설정정보입력<br>
npm i nodemon --save-dev<br>
package.json 의 scripts 부분에 "start": "nodemon app" 입력<br>
app.js 에서 npm start

<br><br>

### 2, 3, 4. mkdir

```javascript
import { existsSync, mkdir } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mkFolder = (dir) => {
  const isExists = existsSync(dir);
  if (!isExists) {
    mkdir(dir, () => {
      console.log(`${dir} 가 생성되었습니다.`);
    });
  }
};
```

<br><br>

### 5. stat

```javascript
import { stat } from "fs";

stat("test.jpeg", (err, stats) => {
  console.log(stats.birthtime); // 생성 날짜
  console.log(stats.mtime); // 최종 수정 날짜
});
```

<br><br>

### 6,7 readdir, readname + path

```javascript
import { readdir, rename } from "fs";
import path from "path";

rename(oldPath, newPath, (err) => {
  if (err) throw err;
});
```

- readdir : 디렉토리를 배열 형태로 읽음 <br>
- readname : 파일 이동
