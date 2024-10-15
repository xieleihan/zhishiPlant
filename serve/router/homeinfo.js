const router = require('express').Router();
const db = require('../db/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';  // 设置一个私密的密钥，用于签发token，应该存放在环境变量中
const {generateToken} = require('../authorization/index');



// 新增 `homeinfo` 表的信息
router.post('/addhomeinfo', async (req, res) => {
  const { img, title, info, type, username, avater, likenum, other, commentid } = req.body;

  // 插入的 SQL 语句
  const sql = `
    INSERT INTO homeinfo (img, title, info, type, username, avater, likenum, other, commentid)
    VALUES ('${img}', '${title}', '${info}', '${type}', '${username}', '${avater}', ${likenum}, ${other}, ${commentid})
  `;

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

module.exports = router;