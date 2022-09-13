// 파일, 폴더를 생성, 삭제, 읽기, 쓰기 가능

// 파일 읽기
const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});

const fsPromise = require('fs').promises;

fsPromise.readFile('./readme.txt')
    .then((data) => {
        console.log(data);
        console.log(data.toString());
    })
    .catch((err) => {
        throw err;
    });


// 파일 생성
fsPromise.writeFile('./writeme.txt', '글이 입력됩니다.')
    .then(() => {
        return fsPromise.readFile('./writeme.txt');
    })
    .then((data)=>{
        console.log(data.toString());
    })
    .catch((err) => {
        throw err;
    });