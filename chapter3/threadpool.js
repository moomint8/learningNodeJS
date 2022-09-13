// 스레드 육안으로 확인해보기
const crypto = require('crypto');

const pass = 'pass';
const salt = 'salt';
const start = Date.now();

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('1', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('2', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('3', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('4', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('5', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('6', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('7', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('8', Date.now() - start);
});
// 결과물을 보면 4개씩 결과물이 묶여있는 것을 확인할 수 있음.
// node가 기본적으로 4개를 시행하기 때문
// 터미널에서 'SET UV_THREADPOOL_SIZE = 코어갯수' 명령어를 통해 사양에 맞게 변경 가능