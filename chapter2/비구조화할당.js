// 속성 이름을 변수로 만들기
const example = { a: 123, b: { c: 135, d: 146 } }
const oldA = example.a;
const oldD = example.b.d;

// 최신 문법
const { a, b: { d } } = example;    // key가 같아야 한다.
console.log(a);
console.log(d);

// old 배열 값 꺼내기
const arr = [1, 2, 3, 4, 5];
const oldX = arr[0];
const oldY = arr[1];
const oldZ = arr[4];

// new 배열 값 꺼내기
const [x, y, , , z] = arr;  // 자리가 같아야 한다.

// this가 있는 경우엔 구조분해(비구조화)를 하지 않는 게 좋다.