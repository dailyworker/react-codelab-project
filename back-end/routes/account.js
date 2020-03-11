import express from 'express';
import Account from '../models/account';
const router = express.Router();


/* 
 * ACCOUNT SIGNUP: POST /api/account/signup
 * BODY SAMPLE :  { "username" : "test", "password" : "test" }
 * ERROR CODES:
 *  1: BAD USERNAME
 *  2: BAD PASSWORD
 *  3: USERNAME ALREADY EXISTS
 */

router.post('/signup', (req, res) => {
    // 사용자 계정 입력 검사용 정규식
    let usernameRegex = /^[a-z0-9]+%/;

    if(!usernameRegex.test(req.body.username)){
        return res.status(400).json({
            error: "BAD USERNAME",
            code: 1
        });
    }

    // 패스워드 길이 및 타입 검사
    if(req.body.password.length < 4 || typeof req.body.password !== "string"){
        return res.status(400).json({
            error: "BAD PASSWORD",
            code : 2
        })
    }

    // 사용자 계정 존재여부 검사
    let findRes = Account.findOne({where : {username : req.body.username}})
                .then(account => {
                    if(account){
                        return res.status(409).json({
                            error: "USERNAME EXISTS",
                            code: 3
                        });    
                    } else {
                        let account = new Account({
                            username : req.body.username,
                            password : req.body.password
                        });
                        
                        // 새로운 계정 생성
                        account.password = account.generateHash(account.password);
        
                        // 생성된 계정 DB 저장
                        Account.create(account);
                        return res.json({ success : true });
                    }
    });
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