// 콜백 헬이라고 불리는 지저분한 자바스크립트 코드의 해결책
// 프로미스 : 내용이 실행은 되었지만 결과를 아직 반환하지 않은 객체
// then을 붙이면 결과를 반환함
// 실행이 완료되지 않았으면 완료된 후 then 내부 함수가 실행됨

// resolve(성공한 경우) then으로 연결
// reject(실패한 경우) catch로 연결
// finally는 결과 상관없이 무조건 실행

const condition = false; // true는 resolve, false는 reject로 연결
const promise = new Promise((resolve, reject) => {
    if (condition) {
        resolve('성공');
    } else {
        reject('실패');
    }
})
// 다른 코드가 들어갈 수 있음
promise
    .then((message) => {
        console.log(message);   // 성공한 경우 실행
    })
    .catch((error) => {
        console.error(error);   // 실패한 경우 실행
    });

// callback은 코드 분리가 되지 않지만 promise는 코드 분리가 가능하다.

const promise1 = Promise.reject('성공1');
const promise2 = Promise.resolve('성공2');
Promise.all([promise1, promise2])
    .then((result) => {
        console.log(result);    // ['성공1', '성공2'];
    })
    .catch((error) => {
        console.error(error);
    });
// 하나라도 실패하면 catch로 감
// allSettled로 실패한 것만 추려낼 수 있음

const promiseSet1 = Promise.resolve('성공1');
const promiseSet2 = Promise.reject('실패1');
const promiseSet3 = Promise.reject('실패2');
const promiseSet4 = Promise.resolve('성공2');
Promise.allSettled([promiseSet1, promiseSet2, promiseSet3, promiseSet4])
    .then((result) => {
        console.log(result);    // ['성공1', '성공2'];
    })
    .catch((error) => {
        console.error(error);
    });


// Async/await으로 한 번 더 축약 가능, async는 promise의 축약형이므로 promise의 특성을 가져간다.
// 단, async는 catch가 되지 않아 try/catch 문을 사용해야 한다.

// old code
function findAndSaveUser(Users) {
    Users.findOne({})
        .then((user) => {
            user.name = 'zero';
            return user.save();
        })
        .then((user) => {
            return Users.findOne({ gender: 'm' });
        })
        .then((user) => {
            // 생략
        })
        .catch((error) => {
            console.error(error);
        });
}

// new code
async function newFindAndSaveUser(Users) {  // 순서가 오른쪽에서 왼쪽
    let user = await Users.findOne({});
    user.name = 'zero';
    user = await user.save();
    user = await Users.findOne({ gender: 'm' });
    //생략
}

// for await of(노드 10부터 지원)
// for await(변수 of 프로미스배열)
    // resolve된 프로미스가 변수에 담겨 나옴
    // await을 사용하기 때문에 async 함수 안에서 해야함
const promiseFor1 = Promise.resolve('성공1');
const promiseFor2 = Promise.resolve('성공2');
(async () => {
    for await (promise of [promiseFor1, promiseFor2]) {
        console.log(promise);
    }
})();