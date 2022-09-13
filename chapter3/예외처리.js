// 에러를 제대로 처리하지 못하면 노드 스레드가 멈춤
// 노드는 기본적으로 싱글스레드이므로 스레드 멈춤 = 프로세스 멈춤

// 기본적인 에러 처리 : try catch

console.log('시작!');
try {
    throw new Error('널 잠 못들고 설레게 만들 에러');
} catch (err) {
    console.log(err);
    console.log('는 너굴맨이 처리했으니 안심하라구!');
}


// 콘솔에서 제공하는 에러처리
const fs = require('fs');

fs.unlink('./noWhere.js', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('do something');
    }
});

// 프로미스의 에러는 따로 처리하지 않아도 됨
// catch를 따로 작성하지 않아도 알아서 함, 단 엄청나게 긴 경고문이 콘솔에 뜸
const fsPromise = require('fs').promises;

fsPromise.unlink('./noWhere.js');

// 최후의 수단, 모든 에러 처리 가능
// 콜백 함수의 동작이 보장되지 않아 복구 작업용으로 쓰는 것은 부적합
// 에러 내용 기록 용으로만 사용하는 것 추천
process.on('uncaughtException', (err) => {
    console.log('예기치 못한 에러', err);
});

setInterval(() => {
    throw new Error('서버를 고장내주마!');
}, 1000);

setTimeout(() => {
    console.log('실행됩니다.');
}, 2000);