const https = require('https');
const fs = require('fs');

https.createServer({
    cert: fs.readFileSync('도메인 인증서 경로'),  // https를 위해 추가되는 부분, 11줄까지, 인증기관에서 인증서를 발급받아 사용하면 됨, letsencrypt는 무료이면서 유명한 인증기관
    key: fs.readFileSync('도메인 비밀키 경로'),
    ca: [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
    ],
}, (req, res) => {  // 여기서부터는 http와 동일
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
    .listen(443, () => {
        console.log('443번 포트에서 서버 대기 중입니다!');
    });