// 处理邮箱的请求
const router = require('express').Router();
// 导入处理邮箱的模块
const emailApi = require('./emailApi');

// 发送QQ邮箱验证码的接口
// URL:  /api/email/send
router.get('/send', async (req,res)=> {
    // 接收qq邮箱
    let { email } = req.query;
	console.log(email)
    // 调用api把验证码发送到邮箱
    await emailApi.getEmailCode(email)
    .then(
        (data) => {
            // 发送邮箱验证码成功
            res.send(data)
        },
        error=> {
            // 发送邮箱验证码失败
            res.send({
                code: -1,
                msg: '发送验证码失败。1111',
                error 
            })
        }
    )
})

router.get('/sendemail', async (req, res) => {
	// 接收qq邮箱
	let { email, uuid, date, from, to, type, randomNumber, base64 } = req.query;
	console.log(email,base64)
	// 调用api把验证码发送到邮箱
	await emailApi.sendeqqmail(email, uuid, date, from, to, type, randomNumber, base64)
		.then(
			(data) => {
				// 发送邮箱验证码成功
				res.send(data)
			},
			error => {
				// 发送邮箱验证码失败
				res.send({
					code: -1,
					msg: '发送失败',
					error
				})
			}
		)
})

// 验证QQ邮箱和验证码的接口
// URL:  /api/email/verify
router.get('/verify', async (req,res)=> {
    // 接收qq邮箱
    let { email, email_code } = req.query;
    // 调用api把验证码发送到邮箱
    await emailApi.verifyEmailCode(email,email_code)
    .then(
        (data) => {
            // 发送邮箱验证码成功
            res.send(data)
            if(data.code == 200) {
                // 删除验证码
                emailApi.removeEmailCode(email);
            }
        },
        error=> {
            // 发送邮箱验证码失败
            res.send(error)
        }
    )
})

// 暴露
module.exports = router;