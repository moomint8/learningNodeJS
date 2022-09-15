const express = require('express');
const path = require('path');
const morgan = require('morgan');   // 요청과 응답을 기록하는 라우터
const cookieParser = require('cookie-parse');   // 쿠키 처리해주는 라우터

const app = express();

// SET PORT = 포트번호 : 해당 포트번호로 포트 사용, 없으면 3000
// 위 명령어를 한 번 사용시 계속 해당 포트 점유하므로 유의
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
// app.use(morgan('combined'));    // dev보다 더 상세하게 알려줌

app.use(cookieParser());

app.use((req, res, next) => {   // next를 포함해줘야 다음 라우터들이 실행됨
    console.log('모든 요청에 실행하고 싶어요.1');
    next();
}, (req, res, next) => {
    console.log('모든 요청에 실행하고 싶어요.2');
    next();
}, (req, res, next) => {    // 에러 미들웨어가 없을 시 너무 상세한 정보가 클라이언트에게 공개돼 보안 취약점이 될 수 있음
    // throw new Error('에러 발생 예제');
    next();
});

app.use('/about', (req, res, next) => {   // next를 포함해줘야 다음 라우터들이 실행됨
    console.log('about 요청에서만 실행하고 싶어요.');
    next();
});

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    if (true) {
        next('route');  // 밑에 무시하고 바로 다음 라우터로 넘어감
    } else {
        next();
    }
}, (req, res) => {
    console.log('실행되나요?');
});

app.get('/', (req, res) => {
    console.log('내가 실행됨');
});

app.post('/', (req, res) => {
    res.send('hello express')
});

app.get('/category/:name', (req, res) => {  // 같은 주소가 반복되고 후주소만 바뀌는 경우 이 예시처럼 작성하면 생략가능, 아래에 카테고리/ㅁㅁㅁ 를 해도 ㅁㅁㅁ실행 X그 래서 보통 이 기능은 맨 아래에 배치
    res.send(`hello ${req.params.name}`);
});

app.get('/about', (req, res) => {
    res.send('hello express')
});

// app.get('*', (req, res) => {
//     res.send("나머지 모든 주소는 여기서 처리, 이 코드를 위에 두지 않도록 유의!");
// })

app.use((req, res, next) => {   // 404 처리 미들웨어
    res.status(404).send('404 주소 제대로 입력 해주세요');  // status 를 이용해 서버상 오류도 브라우저한테 200 status를 보낼 수 있음, 보안 위협으로 인해 400번 500번대는 조심해서 사용 또는 404 통일
});

app.use((err, req, res, next) => {   // 에러 처리 미들웨어, err req res next 반드시 모두 포함!
    console.log(err);
    res.send('에러가 발생했습니다. 알아서 하세요');
});

app.listen(app.get('port'), () => {
    console.log('express 서버 실행');
});

// app.listen(3000, () => {
//     console.log('express 서버 실행');
// });