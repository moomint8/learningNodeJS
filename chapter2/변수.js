// const와 let 사용
// var는 함수 스코프
// const, let은 블록 스코프
// const는 정적 변수, let은 동적 변수

const won = 1000;

var resultOld = "이 과자는" + won + "원입니다.";
console.log(resultOld);

const resultNew = `이 과자는 ${won}원입니다.`;
console.log(resultNew);