// 실행 순서 예상해보기, 동기 코드
function first(){
    second();
    console.log(`첫 번째`);
}
function second(){
    third();
    console.log(`두 번째`);
}
function third(){
    console.log(`세 번째`);
}
first();
// 처음 실행될 때 스택에 anonymous가 쌓이고 그 후 스택 쌓이는대로 LIFO, 호출스택에 anonymous까지 끝나면 종료


// 비동기 코드 순서 예측하기
function run(){
    console.log(`3초 후 실행`);
}
console.log(`시작`);
setTimeout(run, 3000);
console.log(`끝`);
// 호출스택, 메모리, 백그라운드, 태스크 큐에 대한 이해 필요
// setTimeout 같은 비동기 함수는 호출스택에서 백그라운드로 이동, 백그라운드에선 호출스택과 동시에 동작(다른 스레디에서 실행, 가능한 함수 제한됨)
// 백그라운드가 먼저 종료되어도 우선순위는 호출스택에 있음
// 타이머에 지정한 시간이 지나면 태스크 큐로 함수를 보내고 백그라운드를 비움
// 태스크 큐에서 다시 호출스택으로 함수를 보냄(태스크 큐에 있는 것은 호출스택이 비어있을 때만 이동 가능)
// 호출스택 -> 백그라운드 -> 태스크 큐 -> 호출스택

function oneMore(){
    console.log(`one more`);
}
function runrun(){
    console.log(`run run`);
    setTimeout(() => {
        console.log(`wow`);
    }, 0)
    new Promise((resolve) => {
        resolve(`hi`);
    })
    .then(console.log)
    oneMore();
}
setTimeout(runrun, 5000);
// 태스크 큐에서 Promise가 setTimeout보다 늦게 들어와도 우선순위를 가짐
// Promise.then/catch 와 process.NextTick 가 태스크 큐에서 우선순위를 가짐