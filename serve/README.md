# 接口文档

> 作者:@SouthAki
>
> 开源协议: GPL-3.0

## 使用`Node.js`部署的后端服务

![zhishiPlant](https://socialify.git.ci/xieleihan/zhishiPlant/image?description=1&font=Source%20Code%20Pro&forks=1&issues=1&language=1&logo=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F57227318%3Fv%3D4&name=1&owner=1&pattern=Floating%20Cogs&pulls=1&stargazers=1&theme=Light)

### 启动服务前须知

*请修改该文档下的`db/database.js`配置为你本机的配置,才可以运行*

### 启动服务

```sh
npm run start
```

## 详情

### 管理员登录注册

> #### 注册(一次性)
>
> 接口地址:`http://localhost:9008/public/adminregister`
>
> 方法:`POST`
>
> 参数:`adminusername`,`adminuserpassword`
>
> 实现的功能:
>
> - [x] 加密密码,创建一个时间戳的哈希化,做唯一参数值
>
> #### 登录
>
> 接口地址:`http://localhost:9008/public/adminlogin`
>
> 方法:`POST`
>
> 参数:`adminusername`,`adminuserpassword`,`admintoken`
>
> **注意:**`admintoken`从会话存储读取,然后发到后端去比对.
>
> #### 生成验证码(图片人机验证)
>
> 接口地址:`http://localhost:9008/getinfo`
>
> 方法:`GET`
>
> 返回参数:`SVG`图片,使用`v-html`进行渲染即可
>
> #### 比对验证码
>
> 接口地址: `http://localhost:9008/getVerInfo`
>
> 方法: `GET`
>
> 传递参数: `code`
>
> 接口示例:`http://localhost:9008/getVerInfo?code=Your_verCode`
>
> 实现功能:
>
> - [x] 实现两分钟验证码过期
> - [ ] 验证码一次性过期

### 超级管理员功能

> #### 查询用户列表
>
> 接口地址:`https://localhost:9008/super/getUsers`
>
> 方法:`POST`
>
> 参数:`token`(必须)

### 用户登录注册

> #### 注册
>
> 接口地址:`http://localhost:9008/public/register`
>
> 方法:`POST`
>
> 参数:`username`,`useremail`,`userpassword`
>
> 实现的功能:
>
> - [x] 对密码的明文加密
> - [ ] 防止SQL注入
> - [x] 检验数据表中是否有相同的用户名和邮箱
>
> #### 登录
>
> 接口地址:`http://localhost:9008/public/login`
>
> 方法:`POST`
>
> 参数:`useremail`,`userpassword`
>
> 实现的功能:
>
> - [x] 实现登录的时候返回一个`token`,以便后续使用
> - [ ] 防止SQL注入

### 用户信息

> #### 添加用户基本信息(在注册的时候可以同步进行)
>
> 或者在进入前端页面的时候再生成也行
>
> 接口地址:`http://localhost:9008/protected/adduserinfo`
>
> 方法:`POST`
>
> 参数:`username(必须)`,`useravater[用户头像图片,可选]`,`userdesc[用户描述信息,可选]`,`useraddress[用户位置,可选]`
>
> 请求头:key:`Authorization`,**value**:`cookie`获取的`token`
>
> #### 更新用户基本信息
>
> 接口地址:`http://localhost:9008/protected/updateuserinfo`
>
> 方法:`POST`
>
> 参数:`username`,`useravater[用户头像图片]`,`userdesc[用户描述信息]`,`useraddress[用户位置]`,`newUsername`
>
> 请求头:key:`Authorization`,**value**:`cookie`获取的`token`
>
> 实现的功能:
>
> - [x] 先检查是否传入了用户名,没传递的返回
> - [x] 检查数据库有没有重叠的用户名,有就不写入
>
> #### 获取用户信息
>
> 接口地址:`http://localhost:9008/protected/getuserinfo`
>
> 方法:`GET`
>
> 参数:`username`
>
> 请求头:key:`Authorization`,**value**:`cookie`获取的`token`
>
> 实现的功能:
>
> - [x] 先检查是否传入了用户名,没传递的返回

### 首页

> #### 获取首页信息
>
> 接口地址:`http://localhost:9008/public/homeinfo`
>
> 方法:`GET`
>
> #### 新增首页资料卡
>
> 接口地址:`http://localhost:9008/protected/addhomeinfo`
>
> 方法:`POST`
>
> 请求头:key:`Authorization`,**value**:`cookie`获取的`token`
>
> 参数:`img`, `title`, `info`, `type`, `username`, `avater`, `likenum`, `other`, `commentid`

### 系统状态

> #### 获取服务器运行状态
>
> 接口地址:`https://localhost:9008/super/server-info`
>
> 方法:`GET`
>
> 返回JSON数据:包含`CPU`,`GPU(Intel和英伟达)`,`内存占用`
>
> 延时:`20S`,请前端请求的时候考虑服务器的压力,设置对应的时间

# 未完待续
