const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset = utf8mb4' });  // Html 파일이며 한글 사용, safari 등에서 이하 코드를 텍스트로 인식하는 경우가 있기 때문에 작성
    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello server</p>');
    res.end('<p>Hello moomint8</p>');
})
    .listen(8080)
server.on('listening', () => {
    console.log('server in 8080 port is online');
});
server.on('error', (error) => {
    console.error(error);
});