// 노드에서 멀티 스레드 방식으로 작업할 수 있음
// isMainThread : 현재 코드가 메인 스레드에서 실행되는지 워커 스레드에서 실행되는지 구분
// 메인 스레드에서는 new Worker를 통해 현재 파일(__filiname)을 워커 스레드에서 실행시킴
// worker.postMessage로 부모에게 워커로 데이터를 보냄
// parentPort.on('message')로 부모로부터 데이터를 받고, postMessage로 데이터를 보냄

// 메인스레드 부분에서 워커스레드 부분으로 일을 분배하고, 워커스레드의 결과물을 종합해서 메인스레드가 리턴
// 알아서 분배하는 것이 아닌 개발자가 직접 코드를 입력해야함
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

// if (isMainThread) {   // 메인스레드
//     const threads = new Set();
//     threads.add(new Worker(__filename, {
//         workerData: { start: 1 },
//     }));
//     threads.add(new Worker(__filename, {
//         workerData: { start: 2 },
//     }));
//     for (let worker of threads) {
//         worker.on('message', (value) => console.log('워커로부터', value));
//         worker.on('exit', () => {
//             threads.delete(worker);
//             if (threads.size === 0) {
//                 console.log('워커 종료');
//             }
//         });
//     }
// } else {  // 워커스레드
//     const data = workerData;
//     parentPort.postMessage(data.start + 100);
// }


// 천만 이하의 소수 구하기 비교 예제

// 싱글 스레드
const min = 2;
const max = 10_000_000;
const primes = [];

function generatePrimes(start, range) {
    let isPrime = true;
    const end = start + range;
    for (let i = start; i < end; i++) {
        for (let j = min; j < Math.sqrt(end); j++) {
            if (i !== j && i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i);
        }
        isPrime = true;
    }
}

console.time('singlePrime');
generatePrimes(min, max);
console.timeEnd('singlePrime');
console.log(`소수 갯수 : ${primes.length}`);

// 멀티 스레드
let multiPrimes = [];

function findPrimes(start, range) {
    let isPrime = true;
    const end = start + range;
    for (let i = start; i < end; i++) {
        for (let j = min; j < Math.sqrt(end); j++) {
            if (i !== j && i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            multiPrimes.push(i);
        }
        isPrime = true;
    }
}

if (isMainThread) {
    const threadCount = 8;
    const threads = new Set();
    const range = Math.ceil((max - min) / threadCount);
    let start = min;
    console.time('multiPrime');
    for (let i = 0; i < threadCount - 1; i++) {
        const wStart = start;
        threads.add(new Worker(__filename, { workerData: { start: wStart, range } }));
        start += range;
    }
    threads.add(new Worker(__filename, { workerData: { start, range: range + ((max - min + 1) % threadCount) } }));
    for (let worker of threads) {
        worker.on('error', (err) => {
            throw err;
        })
        worker.on('exit', () => {
            threads.delete(worker);
            if (threads.size === 0) {
                console.timeEnd('multiPrime');
                console.log(multiPrimes.length);
            }
        });
        worker.on('message', (msg) => {
            multiPrimes = multiPrimes.concat(msg);
        });
    }
} else {
    findPrimes(workerData.start, workerData.range);
    parentPort.postMessage(multiPrimes);
}