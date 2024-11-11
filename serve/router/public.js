const router = require('express').Router();
const db = require('../db/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';  // 设置一个私密的密钥，用于签发token，应该存放在环境变量中
// const {generateToken} = require('../authorization/index');

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

// 获取所有省份信息的接口
router.get('/provinces', async (req, res) => {
    const sql = 'SELECT DISTINCT province FROM city_info';
    try {
        const result = await db.query(sql);
        res.json({ provinces: result.map(row => row.province) });

    }catch (err) {
        res.status(500).json({ error: 'Database query error' });
    }
});

// 获取对应省份的城市信息
router.get('/cities', async (req, res) => {
    const province = req.query.province;
    if (!province) {
        return res.status(400).json({ error: 'Province name is required' });
    }

    const sql = `SELECT city FROM city_info WHERE province = '${province}'`;

    try {
        const result = await db.query(sql);
        res.json({ cities: result.map(row => row.city) });
    } catch {
        res.status(500).json({ error: 'Database query error' });
    }
});

router.get('/getCityInfo', async (req, res) => {
    const { cityname } = req.query;

    if (!cityname) {
        return res.status(400).json({ error: 'Cityname 参数是必须的' });
    }

    // 查询数据库中 cityname 对应的信息
    const sql = `SELECT * FROM get_city_info WHERE cityname = '${cityname}'`;
    try {
        const result = await db.query(sql);
        res.json({ cityinfo: result[0] });

    }catch (err) {
        res.status(500).json({ error: 'Database query error' });
    }
    
});

module.exports = router;