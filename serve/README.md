# 接口文档

## 使用`Node.js`部署的后端服务

## 使用前须知

> 请在部署后端项目的时候,检查目录下的`db/database.js`文件下的内容
>
> ```javascript
> module.exports = {
>     mysql: {
>         host: '127.0.0.1', // 地址:默认为127.0.0.1或者localhost
>         user: 'root',// 数据库用户名,默认是root
>         password: '123456',// 数据库密码
>         database: 'vue2project',// 数据库名
>         port: '3306'// 端口 默认3306
>     }
> }
> ```
>
> 

## 使用文档

### 登录与注册

> > 可以使用`postman`进行调试,SQL文件在根目录下,用SQL文件在本地创建即可
>
> 下面的方式已经包含对密码的加密
>
> - [x] 对明文密码的加密
>
> - [ ] SQL 注入的风险
>
> **注册**
>
> - 接口地址:`http://localhost:9008/api/register`
>
> - 传递参数:`username`,`email`,`password`(三个参数均为**必须**)
>
> - 方法:**`POST`**
>
> **登录**
>
> - 接口地址:`http://localhost:9008/api/login`
>
> - 传递参数:`email`,`password`(两个参数均为**必须**)
>
> - 方法:**`POST`**
>
> **头像查询**
>
> > 这个部分的实现是通过用户名比对后,将用户上传的头像展示出来
>
> - 接口地址:`http://localhost:9008/api/get-user-faceimg`
> - 传递参数:`username`
> - 方法:`POST`
>
> **头像修改**
>
> > 这个部分实现的是头像修改
>
> - 接口地址:`http://localhost:9008/api/set-user-faceimg`
> - 传递参数:`username`,`faceImg`(注意大小写)
> - 方法: `POST`

### 首页信息

> - 接口地址:`http://localhost:9008/api/homeinfo`
> - 传递参数: `无`
> - 方法:**`GET`**
>
> >  目前数据库提供的数据是测试数据,后续请修改数据为比较正常的假文数据
>
> 接口字段解析
>
> ```sql
> -- 以下没注明的声明的类型均为VARCHAR
> 
> id -- 主键 也作为唯一ID,请勿修改,该处为auto
> hometype  -- 类别,可做分类的详情块,目前只做一个类别,后续请添加一些内容
> img -- 文章图片,用随机图片生成就行,然后是用text方式存储,前端使用需要注意
> title -- 文章标题
> likenum -- 点赞人数 int存储
> avater longblob -- 作者头像,使用base64存储,MySQL数据类型是longblob
> avatertext -- 作者名
> writedate -- 日期,使用MySQL的datetime声明的数据类型格式必须严格为YYYY-MM-DD HH:MM:SS
> descinfo -- 文章具体内容
> ```
>
> 发现的部分可以做个随机从表里生成,减少请求数
>
> - [ ] 可以扩展其他内容在一次请求中完成,必须地址信息之类的

#### 写入首页的内容信息

> - 接口地址:`http://localhost/api/add`
>
> - 传递参数:*仅供参考,必须参数为下面的键*,***id可以忽略***
>
> 	```json
> 	{
> 	    "id":10,
> 	    "hometype": "推荐",
> 	    "img": "https://picsum.photos/300/300?1",
> 	    "title": "这是写入测试",
> 	    "likenum": 100,
> 	    "avater": "base64编码数据",
> 	    "avatertext": "我是作者",
> 	    "writedate": "2024-10-05 00:00:08",
> 	    "descinfo": "这是描述内容"
> 	}
> 	```
>
> 	
>
> - 方法:**`POST`**
>
> - [ ] SQL 注入的风险

### 消息区域

> ### 接收信息
>
> > - 接口地址:`http://localhost:9008/api/query-sms`
> >
> > - 参数:
> >
> > 	```json
> > 	{
> > 	    "username": "szy",
> > 	    "smsdate": "2024-10-05 00:00:00",// 这个地方可以设置成YYYY-MM-DD,也可以YYYY-MM-DD HH:MM:SS
> > 	    "smstype": "收藏"
> > 	}
> > 	```
> >
> > 	`username`,`smsdate`,`smstype`是三个必须传递的参数
> >
> > - 方法:`POST`
> >
> > - [ ] 防止SQL注入攻击
>
> ### 发送信息
>
> > - 接口文档:`http://localhost:9008/api/add-sms`
> >
> > - 示例参数(全部为必须):
> >
> > 	```json
> > 	{
> > 	    "username": "szy2",
> > 	    "smsdate": "2024-11-05 02:00:00",
> > 	    "smstype": "私信",
> > 	    "container": "这是一个测试写入的短信",
> > 	    "avater": "base64",
> > 	    "avatername": "扬梓"
> > 	}
> > 	```
> >
> > - 方法:`POST`

## 购物车

> 获取购物车信息或者搜索功能
>
> - 接口地址:`http://localhost:9008/api/get-cart`
> - 参数:`shopame`,`producttype`**[两个均为可选参数]**
> - 方法:`POST`

## 搜索

> 针对主页的搜索
>
> - 接口地址:`http://localhost:9008/api/searchHomeInfo`
> - 传递参数:`title(文章标题)`,`hometype(类型)`,`likenum(点赞人数)`**[均为可选]**
> - 方法:`GET`
>
> 针对购物车的搜索
>
> - 接口地址:`http://localhost:9008/api/searchShopping`
> - 传递参数:`shopname`, `title`, `producttype`**[均为可选]**
> - 方法:`GET`

