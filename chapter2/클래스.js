// 프로토타입 문법을 깔끔하게 작성할 수 있는 Class 문법 도입

// 프로토타입 예제
var Human = function (type) {   // 생성자
    this.type = type || 'human';
};

Human.isHuman = function (human) {  // static 메서드
    return human instanceof Human;
}

Human.prototype.breathe = function () { // instance 메서드
    alert('h-a-a-a-m');
};

var Zero = function (type, firstName, lastName) {
    Human.apply(this, arguments);
    this.firstName = firstName;
    this.lastName = lastName;
}

Zero.prototype = Object.create(Human.prototype);
Zero.prototype.constructor = Zero;  // 상속하는 부분
Zero.prototype.sayName = function () {
    alert(this.firstName + ' ' + this.lastName);
};
var oldZero = new Zero('human', 'Zero', 'Cho');
Human.isHuman(oldZero); // true
console.log(Human.isHuman(oldZero));
// 상속하는 과정이 복잡하고 직관적이지 않음


// class 문법, 생성자 스태틱 인스턴스가 하나로 합쳐짐
// 좀 더 직관적
class classHuman {
    constructor(type = 'classHuman') {
        this.type = type;
    }

    static isClassHuman(classhuman) {
        return classhuman instanceof classHuman;
    }

    classBreathe() {
        alert('h-u-u-u-m');
    }
}

class classZero extends classHuman {
    constructor(type, firstName, lastName) {
        super(type);    // 35줄 classHuman이 실행
        this.firstName = firstName;
        this.lastName = lastName;
    }

    sayClassName() {
        super.classBreathe();
        alert(`${this.firstName} ${this.lastName}`);
    }
}

const newZero = new classZero('classHuman', 'classZero', 'Cho');
console.log(classHuman.isClassHuman(newZero));