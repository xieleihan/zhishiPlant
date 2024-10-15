const router = require('express').Router();
const db = require('../db/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';  // 设置一个私密的密钥，用于签发token，应该存放在环境变量中
const {generateToken} = require('../authorization/index');

// 定义盐的轮次，用于加密
const saltRounds = 10;
const tokensaltRounds = 10;

let vercode= '$2b$10$QVsHYcoyzVf/F7Qg/8UQfeguZL.Q7JTIr28n2m13I2FbrAarkEUU6';
let verdate;

router.post('/adminregister', async (req, res) => {
    let { adminusername, adminuserpassword } = req.body;
	// console.log(adminusername,adminuserpassword)
	

    // 对密码进行加密处理
    try {
		const dateToken = new Date().getTime().toString();
		verdate = dateToken;
		// console.log(dateToken)
		// console.log("open1")
        const hashedPassword = await bcrypt.hash(adminuserpassword, saltRounds);
		// console.log("open2",hashedPassword)
		const hashToken = await bcrypt.hash(dateToken,tokensaltRounds);
		// console.log("open3",hashToken)
		vercode = hashToken;
        let sql = `insert into adminuser (adminusername,adminuserpassword,admintoken) values ('${adminusername}','${hashedPassword}','${hashToken}')`;
		// console.log(sql)
        db.query(sql).then(result => {
            res.send({
                code: 200,
                message: '注册成功',
                data: result,
				token: vercode
            });
        }).catch(err => {
            res.send({
                code: 500,
                message: '注册失败',
                data: err
            });
        });
    } catch (error) {
        res.send({
            code: 500,
            message: '密码加密失败',
            data: error
        });
    }
});

router.post('/adminlogin', async (req, res) => {
    let { adminusername, adminuserpassword,admintoken } = req.body;
	if(admintoken !== vercode){
		res.send({
			"code":500,
			"message":"no date"
		})
		return;
	}

    let sql = `SELECT * FROM adminuser WHERE adminusername = '${adminusername}'`;
	// console.log("request1")
    db.query(sql).then(async (result) => {
		console.log("request2",result)
        if (result.length > 0) {
            const user = result[0];
			console.log("request3",user)
            // 验证密码
			console.log(adminuserpassword, user.adminuserpassword,adminuserpassword === user.adminuserpassword)
            const match = await bcrypt.compare( adminuserpassword, user.adminuserpassword);
			console.log(match)
            if (match) {
                res.send({
					
                    code: 200,
                    message: '登录成功',
                    token: vercode,  // 返回生成的 token
                    data: user
                });
            } else {
                res.send({
                    code: 400,
                    message: '密码错误'
                });
            }
        } else {
            res.send({
                code: 404,
                message: '用户不存在'
            });
        }
    }).catch(err => {
        res.send({
            code: 500,
            message: '登录失败',
            data: err
        });
    });
});

router.post('/register', async (req, res) => {
    let { username, useremail, userpassword } = req.body;

    // 对密码进行加密处理
    try {
		let usernameCheakSql = `SELECT count(*) as count from user where username = '${username}'`;
		let usernameCheakResult = await db.query(usernameCheakSql);
		if(usernameCheakResult[0].count > 0){
			return res.send({
				code:400,
				message:'用户已经注册'
			});
		}
		let emailCheakSql = `SELECT count(*) as count from user where useremail = '${useremail}'`;
		let emailCheakResult = await db.query(emailCheakSql);
		
		if(emailCheakResult[0].count > 0){
			return res.send({
				code:400,
				message:'邮箱已经注册'
			})
		}
		
		
        const hashedPassword = await bcrypt.hash(userpassword, saltRounds);
        let sql = `insert into user (username,useremail,userpassword) values ('${username}','${useremail}','${hashedPassword}')`;

        db.query(sql).then(result => {
            res.send({
                code: 200,
                message: '注册成功',
                data: result
            });
        }).catch(err => {
            res.send({
                code: 500,
                message: '注册失败',
                data: err
            });
        });
    } catch (error) {
        res.send({
            code: 500,
            message: '密码加密失败',
            data: error
        });
    }
});

router.post('/login', async (req, res) => {
    let { useremail, userpassword } = req.body;

    let sql = `SELECT * FROM user WHERE useremail = '${useremail}'`;
	// console.log("request1")
    db.query(sql).then(async (result) => {
		// console.log("request2")
        if (result.length > 0) {
            const user = result[0];
			// console.log("request3")
            // 验证密码
            const match = await bcrypt.compare(userpassword, user.userpassword);

            if (match) {
                // 生成 token
				// console.log("request3")
				const token = generateToken({useremail: user.useremail})
				
				 console.log("zheshi"+token)
                

                res.send({
					
                    code: 200,
                    message: '登录成功',
                    token: token,  // 返回生成的 token
                    data: user
                });
            } else {
                res.send({
                    code: 400,
                    message: '密码错误'
                });
            }
        } else {
            res.send({
                code: 404,
                message: '用户不存在'
            });
        }
    }).catch(err => {
        res.send({
            code: 500,
            message: '登录失败',
            data: err
        });
    });
});

module.exports = router;