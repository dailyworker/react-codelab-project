import express from 'express';

const router = express.Router();

router.post('/signup', (req, res) => {
    // 추후 코드 기입 예정
    res.json({ success : true});
});

router.post('/signin', (req, res) => {
    // 추후 코드 기입 예정
    res.json({ success : true});
});

router.get('/getinfo', (req, res) => {
    // 추후 코드 기입 예정
   res.json({ info : null}); 
});

router.post('/logout', (req, res) => {
    return res.json({ success : true });
});

export default router;