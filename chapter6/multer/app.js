// html의 form태그 enctype가 multipart/form-data인 경우 body-parser나 express 등으로는 파일을 읽을 수 없음
// 그래서 multer이라는 패키지를 사용
// multer 함수 안에 네 개의 미들웨어가 있음
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

const multer = require('multer');
const fs = require('fs');

try {   // 파일을 저장할 uploads라는 폴더가 없으면 생성
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}
const upload = multer({
    storage: multer.diskStorage({   // storage : 업로드할 파일 저장 위치, 디스크나 메모리 등에 저장 가능
        destination(req, file, done) {  // 저장위치
            done(null, 'uploads/'); // null 이 에러처리를 해줌
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);   // 파일 이름이 중복되어 덮어씌워주는 것을 막기 위해 현재시간 기입(다른 방법도 가능)
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },  // limits : 파일 사이즈나 갯수 등 지정 가능, 여기서는 5메가바이트까지만 받겠다는 뜻
});
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload', upload.single('image'), (req, res) => { // 한 라우터에서만 미들웨어를 적용하기 위해 use 대신 post 사용
    console.log(req.file);
    res.send('ok');
});

app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
    next();
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});