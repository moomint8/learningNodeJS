// GET : 서버 자원을 가져오려고 할 때
// POST : 서버에 자원을 새로 등록하고자 할 때(또는 뭘 쓸지 애매할 때)
// PUT : 서버의 자원을 요청에 들어있는 자원으로 치환하고자 할 때
// PATCH : 서버의 자원을 일부만 수정하고자 할 때
// DELETE : 서버의 자원을 삭제하고자 할 때

const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req, res) => {
    try {
        res.writeHead(200, { 'Content-Type': 'text/html; charset = utf8mb4' });  // Html 파일이며 한글 사용, safari 등에서 이하 코드를 텍스트로 인식하는 경우가 있기 때문에 작성
        const data = await fs.readFile('./httpFront.html');
        res.end(data);
    } catch (error) {
        console.error(error);
        res.writeHead(200, { 'Content-Type': 'text/plain; charset = utf8mb4' });
        res.end(error.message);
    }
})
    .listen(8080)
server.on('listening', () => {
    console.log('server in 8080 port is online');
});
server.on('error', (error) => {
    console.error(error);
});