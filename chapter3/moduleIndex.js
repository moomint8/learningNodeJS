const { odd, even } = require('./moduleVar');
const checkNumber = require('./moduleFunc');

const checkStringOddOrEven = (str) => {
    if (str.length % 2) {
        return odd;
    } else {
        return even;
    }
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));