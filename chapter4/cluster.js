// 싱글 스레드인 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈
// 코어 갯수만큼 성능이 배로 되는 것은 아니지만 개선됨
// 단점 : 컴퓨터 자원(메모리, 세션)을 공유하지 못함
// Redis 등 별도 서버로 해결
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`마스터 프로세스 아이디: ${process.pid}`);
    // CPU 개수만큼 워커를 생산
    for (let i = 0; i < numCPUs; i += 1) {
        cluster.fork();
    }
    // 워커가 종료되었을 때
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        console.log('code', code, 'signal', signal);
        cluster.fork();     // 워커가 종료되었을 때 새로운 cluster 다시 실행
    }); 
} else {
    // 워커들이 포트에서 대기
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Cluster!</p>');
        setTimeout(() => { // 워커 존재를 확인하기 위해 1초마다 강제 종료
            process.exit(1);
        }, 1000);
    }).listen(8086);

    console.log(`${process.pid}번 워커 실행`);
}