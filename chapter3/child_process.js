// 다른 언어 사용하기
// spawn.js 에서 이어짐
// 워커스레드 이용 대신 멀티스레드를 지원하는 타 언어를 사용할 때 이용

const exec = require('child_process').exec;

var process = exec('dir');

process.stdout.on('data', function (data) { // 5줄에 대한 결과물
    console.log(data.toString());
});

process.stderr.on('data', function (data) {
    console.error(data.toString());
});