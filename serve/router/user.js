const router = require('express').Router();
const db = require('../db/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';  // 设置一个私密的密钥，用于签发token，应该存放在环境变量中
// const {authenticateToken} = require('../authorization/index');

// 定义盐的轮次，用于加密
const saltRounds = 10;

router.post('/adduserinfo', async (req, res) => {
    const { useravater, userdesc, useraddress, username } = req.body;

    // 如果没有传递 username，使用时间戳代替
    const finalUsername = username ? username : `user_${Date.now()}`;
	
	let imglists = [
		'https://github.com/xieleihan/webModule/blob/main/avaterProject/1.jpg?raw=true',
		'https://github.com/xieleihan/webModule/blob/main/avaterProject/2.jpg?raw=true',
		'https://github.com/xieleihan/webModule/blob/main/avaterProject/3.jpg?raw=true',
		'https://github.com/xieleihan/webModule/blob/main/avaterProject/4.jpg?raw=true',
		'https://github.com/xieleihan/webModule/blob/main/avaterProject/5.jpg?raw=true',
		'https://github.com/xieleihan/webModule/blob/main/avaterProject/6.jpg?raw=true',
	];
	
	const randomNum = Math.floor(Math.random() * 6)
	
	const finalUserAvater = useravater ? useravater : imglists[randomNum];
	
	const finalUserdesc = userdesc ? userdesc : '欢迎来到一个全新的世界,希望你开心';
	
	const finalUserAddress = useraddress ? useraddress : '未知';

    let sql = `INSERT INTO userinfo (useravater, userdesc, useraddress, username) VALUES ('${finalUserAvater}','${finalUserdesc}','${finalUserAddress}','${finalUsername}')`;

    try{
        db.query(sql).then(result => {
            res.send({
                code: 200,
                message: '插入成功',
                data: result
            });
        }).catch(err => {
            res.send({
                code: 500,
                message: '插入失败',
                data: err
            });
        });
    } catch (error) {
        res.send({
            code: 500,
            message: '拒绝响应',
            data: error
        });
	}
});

router.post('/updateuserinfo', async (req, res) => {
    const { username, useravater, userdesc, useraddress, newUsername } = req.body;

    // 检查是否提供了用户名
    if (!username) {
        return res.status(400).send({
            code: 400,
            message: '用户名未提供'
        });
    }

    // 查询数据库中是否存在该用户名
    const checkUserSql = `SELECT * FROM userinfo WHERE username = '${username}'`;

    try {
        const existingUser = await db.query(checkUserSql);

        // 如果没有找到用户，返回错误
        if (existingUser.length === 0) {
            return res.status(404).send({
                code: 404,
                message: '用户未找到'
            });
        }

        // 如果提供了 newUsername，则检查是否已存在该用户名
        if (newUsername) {
            const checkNewUserSql = `SELECT count(*) as count FROM userinfo WHERE username = '${newUsername}'`;
            let usernameCheakResult = await db.query(checkNewUserSql);

            if (usernameCheakResult[0].count > 0) {
                return res.send({
                    code: 400,
                    message: '新用户名已被占用'
                });
            }
        }

        // 构建更新SQL语句，保持旧用户名不变如果没有 newUsername
        const finalUsername = newUsername || username;
        const updateSql = `
            UPDATE userinfo 
            SET 
                useravater = '${useravater}', 
                userdesc = '${userdesc}', 
                useraddress = '${useraddress}', 
                username = '${finalUsername}'
            WHERE 
                username = '${username}'`;

        // 执行更新操作
        const result = await db.query(updateSql);

        res.send({
            code: 200,
            message: '用户信息更新成功',
            data: result
        });

    } catch (err) {
        res.status(500).send({
            code: 500,
            message: '用户信息更新失败',
            error: err
        });
    }
});

router.get('/getuserinfo', async (req, res) => {
    const { username } = req.query;

    // 检查是否提供了用户名
    if (!username) {
        return res.status(400).send({
            code: 400,
            message: '用户名未提供'
        });
    }

    // 查询用户信息
    const sql = `SELECT useravater, userdesc, useraddress FROM userinfo WHERE username = '${username}'`;

    try {
        const result = await db.query(sql);

        // 如果没有找到用户，返回 404 错误
        if (result.length === 0) {
            return res.status(404).send({
                code: 404,
                message: '用户未找到'
            });
        }

        // 返回用户信息
        res.send({
            code: 200,
            message: '查询成功',
            data: result[0]  // 返回查询结果中的第一个用户信息
        });

    } catch (err) {
        res.status(500).send({
            code: 500,
            message: '查询失败',
            error: err
        });
    }
});

module.exports = router;