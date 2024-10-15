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

module.exports = router;