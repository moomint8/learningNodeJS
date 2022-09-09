// console 객체
const str = 'abc';
const num = 1;
const bool = true;
const obj = {
    outside: {
        inside: {
            key: 'value',
        },
    },
};
console.time('전체 시간');
console.log('평범한 로그입니다. 쉼표로 구분해 여러 값을 찍을 수 있습니다.');
console.log(str, num, bool);
console.error('에러 메시지는 console.error에 담아주세요');

console.table([{ name: '제로', birth: 1994 }, { name: 'hero', birth: 1988 }]);

console.dir(obj, { colors: false, depth: 2 });
console.dir(obj, { colors: true, depth: 1 });


console.time('시간 측정');
for (let i = 0; i < 100000; i++) { }
console.timeEnd('시간 측정');

const b = () => {
    console.trace('에러 위치 추적');
}
const a = () => {
    b();
}
a();

console.timeEnd('전체 시간');


// 타이머 메서드
const timeout = setTimeout(() => {
    console.log('1.5초 뒤 실행');
}, 1500);

const interval = setInterval(() => {
    console.log('1초마다 실행');
}, 1000);

const timeout2 = setTimeout(() => {
    console.log('실행되지 않습니다.');
}, 3000);

setTimeout(() => {
    clearTimeout(timeout2);
    clearInterval(interval);
    console.log('실행 취소');
}, 2500);

const immediate = setImmediate(() => {
    console.log('즉시 실행');
});

const immediate2 = setImmediate(() => {
    console.log('실행되지 않습니다.');
});

clearImmediate(immediate2);


// file 접근
console.log(__filename);    // 현재 파일 경로
console.log(__dirname);     // 현재 폴더(디렉토리) 경로


// this, 전역으로 선언된 this는 global이 아닌 module.exports
console.log(`this === module.exports? ${this === module.exports}`);
console.log(`this === global? ${this === module.global}`);

function checkThis() {
    console.log(`this in func === module.exports? ${this === module.exports}`);
    console.log(`this in func === global? ${this === global}`);
}
checkThis();