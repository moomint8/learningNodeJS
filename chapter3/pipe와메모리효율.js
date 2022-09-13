const fs = require('fs');
const zlib = require('zlib');   // 압축 모듈

// readStream으로 읽은 파일을 writeStream에 지정한 파일로 옮겨적기
const readStream = fs.createReadStream('./readmeStream.txt', { highWaterMark: 16 });
const zlibStram = zlib.createGzip();
const writeStream = fs.createWriteStream('./writemeStream2.txt.gz');
readStream.pipe(zlibStram).pipe(writeStream);


// 효율 비교하기

// const file = fs.createWriteStream('./big.txt');
// for (let i = 0; i <= 10_000_000; i++) {
//     file.write(`안녕하세요 엄청나게 큰 파일을 만들어 볼 것입니다. 1회 실행 후 주석처리될 예정입니다. ${i + 1}번째 시행중입니다.\n`);
// }
// file.end();

console.log('before : ', process.memoryUsage().rss);

const data1 = fs.readFileSync('./big.txt');     // 버퍼 통채로 옮기기
fs.writeFileSync('./big2.txt', data1);
console.log('buffer : ', process.memoryUsage().rss);

// 스트림으로 읽기
console.log('before Stream : ', process.memoryUsage().rss);

const readStream1 = fs.createReadStream('./big.txt');
const writeStream1 = fs.createWriteStream('./big3.txt');
readStream1.pipe(writeStream1);
readStream1.on('end', () => {
    console.log('stream : ', process.memoryUsage().rss)
})