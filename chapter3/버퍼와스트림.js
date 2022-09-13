// 버퍼 : 일정한 크기로 모아두는 데이터, 한 번에 처리
// 스트림 : 데이터의 흐름, 일정한 크기로 나누어 여러 번에 걸쳐 처리
// 스트리밍 : 일정한 크기의 데이터를 지속적으로 전달하는 작업

// 버퍼
const buffer = Buffer.from('저를 버퍼로 바꿔보세요');
console.log(buffer);
console.log(buffer.length);
console.log(buffer.toString());

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
console.log(Buffer.concat(array).toString());   // concat으로 나누어진 버퍼를 합칠 수 있음

console.log(Buffer.alloc(5));   // 빈 버퍼

// 스트림
const fs = require('fs');
const readStream = fs.createReadStream('./readmeStream.txt', { highWaterMark: 16 });   // 단위는 바이트, 기본적으로 64kb를 읽으므로 테스트를 위해 간격을 줄임

const data = [];
readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data : ', chunk, chunk.length);
});
readStream.on('end', () => {
    console.log('end : ', Buffer.concat(data).toString());
});
readStream.on('error', (err) => {
    console.log('error : ', err);
});

// 스트림으로 파일 생성
const writeStream = fs.createWriteStream('./writemeStream.txt');
writeStream.on('finish',()=>{
    console.log('파일 쓰기 완료 by Stream');
});

writeStream.write('스트림을 이용해 글을 씁니다.\n');
writeStream.write('한 번 더 글을 씁니다.');
writeStream.end();