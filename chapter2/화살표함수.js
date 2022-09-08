// const, let처럼 화살표함수가 function(){}의 완전한 대체제는 아님
// 간결한 표현이 가능

// 함수 표현 방식, 모두 같은 기능
function add1(x, y) {
    return x + y;
}

const add2 = (x, y) => {
    return x + y;
}

const add3 = (x, y) => x + y;   // return이 바로 나오는 경우만 생략 가능

const add4 = (x, y) => (x + y); // 객체를 return하는 경우는 () 필수, node가 함수의 body인지 return인지 혼동하기 때문에

// 다른 예제
function not1(x) {
    return !x;
}

const not2 = x => !x;

// 완전히 대체하지 못하는 이유 : this
var relationship1 = {
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends: function () {
        var that = this;
        this.friends.forEach(function (friend) {
            console.log(that.name, friend);
        })
    }
}
relationship1.logFriends();

// logFriends 메서드의 this 값에 주목
// forEach의 function의 this와 logFriends의 this는 다름
// that이라는 중간 변수를 이용해서 logFriends의 this를 전달
// function은 자신만의 this를 갖기 때문에 부모의 this를 가져오려면 that을 이용
// this가 필요한 경우엔 function을 사용하고, 아닌 경우엔 화살표 함수 이용

var relationship2 = {
    name: 'zero :',
    friends: ['nero', 'hero', 'xero'],
    logFriends: function () {
        this.friends.forEach(friend => {
            console.log(this.name, friend);
        })
    }
}
relationship2.logFriends();

// 화살표 함수 변환 예제
button.addEventListener('click', function () {   // function의 경우
    console.log(this.textContent);
})

button.addEventListener('click', (e) => {   // 화살표 함수의 경우
    console.log(e.target.textContent);
})