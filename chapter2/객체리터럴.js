// ES5 시절 객체 표현 방법
var sayNode = function(){
    console.log('Node');
};
var es = 'ES'
var oldObject = {
    sayJS: function(){
        console.log('JS');
    },
    sayNode: sayNode,
};
oldObject[es + 2015] = 'Fantastic';
oldObject.sayNode();    // Node
oldObject.sayJS();      // JS
console.log(oldObject.ES2015); // Fantastic


// ES6 객체 표현 방법
const newObject = {
    sayJS() {
        console.log('JS');
    },
    sayNode,
    [es + 6]: 'Fantastic',
};
newObject.sayNode();    // Node
newObject.sayJS();      // JS
console.log(newObject.ES6); // Fantastic