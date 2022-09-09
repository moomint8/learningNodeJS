// 노드는 자바스크립트 코드를 모듈로 만들 수 있음
// 모듈 : 특정한 기능을 하는 함수나 변수들의 집합
// 모듈로 만들면 여러 프로그램에서 재사용 가능

const value = require('./moduleVar');
console.log(value);
console.log(`4는 ${value.even}`);


const { odd, even } = require('./moduleVar');
const checkOddOrEven = number => {
    if (number % 2) {
        return odd;
    } else {
        return even;
    }
}

module.exports = checkOddOrEven;// module.exports 는 파일에서 단 한 번만 사용 가능