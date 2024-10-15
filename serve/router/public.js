const router = require('express').Router();
const db = require('../db/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';  // 设置一个私密的密钥，用于签发token，应该存放在环境变量中
const {generateToken} = require('../authorization/index');

// 获取所有 `homeinfo` 表的数据
router.get('/homeinfo', async (req, res) => {
  const sql = 'SELECT * FROM homeinfo';

  try {
        const result = await db.query(sql);

        // 返回用户信息
        res.send({
            code: 200,
            message: '查询成功',
            data: result  // 返回查询结果中的第一个用户信息
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