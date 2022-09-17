const express = require('express');

const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => { // GET /route/
    res.send('Hello, Express! 라우터 분리 배우기 route');
});

module.exports = router;