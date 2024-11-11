// 导包
const fs = require('fs');
const path = require('path');
const sendEmail = require('./sendEmail');
// 生成ID
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const qq = require('./qq');
// 导入已封装的数据函数
const db = require('../db/index');
const PROJECT_NAME = qq.name;
const FROM_EMAIL = qq.email;//开发者邮箱

// 储存验证码的方案：
// 1: 写入.txt文件
// 2: 储存在数据库(推荐)
// 3: 使用nodejs储存机制
class Email {
    static delay = null;
    // 发送邮件
    static getEmailCode(client_email) {
		console.log("来到这里了,发送邮件")
        return new Promise((resolve,reject)=>{
            // 生成验证码
            // let email_code = Math.random().toString().slice(-6);
            let email_code = Math.random().toString().slice(-6);//四位随机数
            // id
            let code_id = uuidv4();
			console.log(email_code,code_id)
            //随机生成6位数字
            let email = {
                title: `${PROJECT_NAME}---邮箱验证码`,
                body: 
`
<div style="width: 400px;height: 50px;display: flex;flex-direction: row ;align-items: center;">
<img style="width:50px;height:50px;margin-right: 10px;" src="https://github.com/xieleihan/QingluanSearch-AndroidDev/raw/main/peacock_flat.png" alt="" />
<span style="font-weight: bold;font-family: kaiti;">知识星球  <span style="font-family: kaiti;letter-spacing: 15px;color: #ccc;display: block;margin-left: 10px;font-size: 12px;">一个知识分享平台</span></span>
</div>
<h1>您好：</h1>
<p style="font-size: 18px;color:#000;">
您的验证码为：
<span style="font-size: 16px;color:#f00;"><b>${email_code}</b>,</span>
<p>您当前正在登录${PROJECT_NAME}的管理员账号，验证码告知他人将会导致数据信息被盗，请勿泄露!
</p >
<p>他人之招,谨防上当受骗,12345是官方客服唯一电话.</p >
</p >
<p style="font-size: 1.5rem;color:#999;">3分钟内有效</p >
`
            }
			console.log(email)
            let emailCotent = {
                from: FROM_EMAIL, // 发件人地址
                to: `${client_email}`, // 收件人地址，多个收件人可以使用逗号分隔
                subject: email.title, // 邮件标题
                html: email.body // 邮件内容
            }
			console.log(emailCotent)
            console.log('x.5',client_email)
            // 做多一层判断，判断是否重复发送验证码
            let sql = `select client_email from db_email_code where client_email='${client_email}'`;
            // let sql = `select client_email from db_email_code where client_email='${client_email}'`;
            db.query(sql)
            .then(
                async (rows)=>{
                    console.log("x.2",rows)
                    if(rows.length >= 1){
                        console.log("已经发送过验证码")
                        resolve({
                            code: 1,
                            msg: '已发送验证码,请勿重复发送。60秒后重新发送。'
                        })
                    }
                    else {
                        // 发送邮件
                        await sendEmail.send(emailCotent);
                        // 345234523@qq.com
                        // console.log('x.1',{client_email,email_code,code_id});
                        // 把验证码储存数据库
                        Email.writeEmailCode(client_email,email_code,code_id)
                        .then(
                            // 发送成功
                            () =>{
                                if(Email.delay != null) {
                                    clearTimeout(Email.delay);
                                    resolve({
                                        code: 1,
                                        msg: '请60秒后重新发送验证码。'
                                    });
                                    return;
                                }
                                // 执行resolve函数（给用户一个反馈）
                                // console.log('x.6',{client_email,email_code,code_id});
                                resolve({
                                    code: 200,
                                    msg: '发送验证码成功。'
                                });

                                // 60秒之后删除验证码
                                Email.delay = setTimeout(()=>{
                                    Email.removeEmailCode(client_email)
                                    clearTimeout(Email.delay);
                                    Email.delay = null;
                                }, 60 * 1000 * 3)
                            },
                            ()=> {
                                // console.log("发送邮箱验证发生异常。")
                                reject({
                                    code: -1,
                                    msg: '发送邮箱验证发生异常。'
                                })
                            }
                        )
                    }
                },
                ()=>{
                    reject({
                        code: -1,
                        msg: '服务端发生异常。'
                    })
                }
            )
        })
	}
	
	static sendeqqmail(client_email, uuid, date, from, to, type, randomNumber, base64) {
		console.log("来到这里了,发送邮件", client_email, uuid, date, from, to, type, randomNumber, base64)
		return new Promise((resolve, reject) => {
			
			let email = {
				title: `山海行`,
				body:
					`
<div style="width: 400px;height: 50px;display: flex;flex-direction: row ;align-items: center;">
<img style="width:50px;height:50px;margin-right: 10px;" src="https://github.com/xieleihan/Travel-of-Mountains-and-Seas/blob/main/miniprogram/assets/icon/XRLTCOrange.png?raw=true" alt="" />
<span style="font-weight: bold;font-family: kaiti;">香港铁路局  <span style="font-family: kaiti;letter-spacing: 15px;color: #ccc;display: block;margin-left: 10px;font-size: 12px;">Hong Kong West Kowloon Railway Station</span></span>
</div>
<h1>您好：</h1>
<p style="font-size: 18px;color:#000;">
您的车票信息为：
<span style="font-size: 16px;color:#f00;"><b>车票</b>,</span>
<p>日期:${date}的高铁,从${from}到${to},座位类型:${type},车次:${randomNumber}
</p>
<p>识别码:${uuid}</p>
<img style="width:50px;height:50px;" src="${base64}" alt="" />
<p>给你我的财团,我的蓝州,我的全世界</p>
<p>他人之招,谨防上当受骗,test是官方客服唯一电话.</p >
</p >
<p style="font-size: 1.5rem;color:#999;">误收回复TD</p >
`
			}
			console.log(email)
			let emailCotent = {
				from: FROM_EMAIL, // 发件人地址
				to: `${client_email}`, // 收件人地址，多个收件人可以使用逗号分隔
				subject: email.title, // 邮件标题
				html: email.body // 邮件内容
			}
			
			sendEmail.send(emailCotent);
			resolve({
				code: 200,
				msg: '发送成功。'
			});	
		})
	}


    // 添加验证码
    static async writeEmailCode(client_email,email_code,code_id){
        // console.log('x.0',{client_email,email_code,code_id})
        return new Promise((resolve,reject)=>{
            // 执行插入数据的sql语句
            let sql = `insert into db_email_code(client_email,email_code,code_id) values('${client_email}','${email_code}','${code_id}')`;
            db.query(sql)
            .then(
                rows=>{
                    resolve({
                        code: 200,
                        msg: '添加验证码成功。'
                    })
                }
            )
            .catch(
                err=>{
                    reject({
                        code: -1,
                        msg: '添加验证码失败。',
                        err 
                    })
                }
            )
        })
    }

    // 删除验证码
    static async removeEmailCode(client_email){
        return new Promise((resolve,reject)=>{
            // 执行删除数据的sql语句
            let sql = `delete from db_email_code where client_email = '${client_email}'`;
            db.query(sql)
            .then(
                rows=>{
                    resolve({
                        code: 200,
                        msg: '删除验证码成功。'
                    })
                }
            )
            .catch(
                err=>{
                    resolve({
                        code: -1,
                        msg: '删除验证码失败。',
                        err 
                    })
                }
                
            )
        })
    }

    // 判断邮箱的验证码是否是过期(是否有该验证码)
    static async verifyEmailCode(client_email,email_code){
        console.log('x.1',{client_email,email_code})
         // 判断邮箱和验证码是否匹配
         return new Promise((resolve,reject)=>{
            // 执行查询数据的sql语句
            let sql = `select client_email from db_email_code where client_email = '${client_email}' and email_code='${email_code}'`;
			console.log(sql)
            db.query(sql)
            .then(
                rows=>{
                    console.log("x.3",rows)
                    console.log("x.4",rows.length)
                    if(rows.length === 1){
                        resolve({
                            code: 200,
                            msg: '邮箱验证成功。'
                        })
                       
                    }
                    else {
                        console.log('x.2',{client_email,email_code})
                        resolve({
                            code: -1,
                            msg: '邮箱验证失败1111。'
                        })
                    }
                },

                err=>{
                    reject({
                        code: -1,
                        msg: '邮箱验证失败2222。',
                        err 
                    })
                }
            )
         })
    }
    
}
module.exports = Email;