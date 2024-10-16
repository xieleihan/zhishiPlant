// 导包
const fs = require('fs');
const path = require('path');
const sendEmail = require('./sendEmail');
// 生成ID
const { v4: uuidv4 } = require('uuid');
const qq = require('./qq');
// 导入已封装的数据函数
const db = require('../../config/db');
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
        return new Promise((resolve,reject)=>{
            // 生成验证码
            // let email_code = Math.random().toString().slice(-6);
            let email_code = Math.random().toString().slice(-6);//四位随机数
            // id
            let code_id = uuidv4();
            //随机生成6位数字
            let email = {
                title: `${PROJECT_NAME}---邮箱验证码`,
                body: `
                        <h1>您好：</h1>
                        <p style="font-size: 18px;color:#000;">
                            您的验证码为：
                            <span style="font-size: 16px;color:#f00;"><b>${email_code}</b>,</span>
                            <p>您当前正在${PROJECT_NAME}账号，验证码告知他人将会导致数据信息被盗，请勿泄露!</p>
                        </p>
                        <p style="font-size: 1.5rem;color:#999;">60秒内有效</p>
                        <script>
                            console.log('test')
                        </script>
                        `
            }
            let emailCotent = {
                from: FROM_EMAIL, // 发件人地址
                to: `${client_email}`, // 收件人地址，多个收件人可以使用逗号分隔
                subject: email.title, // 邮件标题
                html: email.body // 邮件内容
            }
            // console.log('x.5',client_email)
            // 做多一层判断，判断是否重复发送验证码
            let sql = `select client_email from db_email_code where client_email='${client_email}'`;
            // let sql = `select client_email from db_email_code where client_email='${client_email}'`;
            db.query(sql)
            .then(
                async (rows)=>{
                    // console.log("x.2",rows)
                    if(rows.length >= 1){
                        // console.log("已经发送过验证码")
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
                                }, 60 * 1000)
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
        // console.log('x.1',{client_email,email_code})
         // 判断邮箱和验证码是否匹配
         return new Promise((resolve,reject)=>{
            // 执行查询数据的sql语句
            let sql = `select client_email from db_email_code where client_email = '${client_email}' and email_code='${email_code}'`;
            db.query(sql)
            .then(
                rows=>{
                    // console.log("x.3",rows)
                    // console.log("x.4",rows.length)
                    if(rows.length === 1){
                        resolve({
                            code: 200,
                            msg: '邮箱验证成功。'
                        })
                       
                    }
                    else {
                        // console.log('x.2',{client_email,email_code})
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