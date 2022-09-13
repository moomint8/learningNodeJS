// 커스텀 이벤트 만들기
const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1', () => {
    console.log('이벤트1');
});
myEvent.on('event2', () => {
    console.log('이벤트2');
});
myEvent.on('event2', () => {
    console.log('이벤트2 추가');
});
myEvent.once('event3', () => {
    console.log('이벤트3');
}); // 한 번만 실행됨

myEvent.emit('event1'); // 이벤트 호출
myEvent.emit('event2'); // 이벤트 호출

myEvent.emit('event3'); // 이벤트 호출
myEvent.emit('event3'); // 실행 안됨

myEvent.on('event4', () => {
    console.log('이벤트4');
})
myEvent.removeAllListeners('event4');   // 이벤트 삭제
myEvent.emit('event4'); // 실행 안됨

const listener = () => {
    console.log('이벤트5');
}
myEvent.on('event5', listener);
myEvent.removeAllListeners('event5', listener);   // 이벤트 삭제
myEvent.emit('event5'); // 실행 안됨

console.log(myEvent.listenerCount('event2'));