const express = require('express');

const router = express.Router();

// GET /user 라우터
router.get('/', (req, res) => { // GET /user/
    res.send('Hello, Express! 라우터 분리 배우기 user');
});

module.exports = router;