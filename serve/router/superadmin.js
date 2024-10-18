const router = require('express').Router();
const db = require('../db/index.js');
let vercode= '$2b$10$QVsHYcoyzVf/F7Qg/8UQfeguZL.Q7JTIr28n2m13I2FbrAarkEUU6';

router.post('/getUsers', (req, res) => {
  let {token} = req.body;
  if(token !== vercode){
	  res.send({
		  "code":401,
		  "message":"未授权,拒绝访问"
	  })
	  return;
  }
  
  const sql = 'SELECT * FROM user';
  db.query(sql).then(result =>{
	  res.send({
			code: 200,
			message: '查询成功',
			data: result,
		});
    }).catch(err => {
        res.send({
            code: 500,
            message: '失败',
            data: err
        });
  })
});


// 获取所有 `homeinfo` 表的数据
router.get('/adminhomeinfo', async (req, res) => {
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