// require() 导入/加载
// 导包
const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
// 创建程序
const app = express()

const db = require('./db/index.js')

// 使用中间件
// app.use(cors())
app.use(cors({
    origin: '*', // 只允许来自这个域名的请求
    methods: 'GET,POST,PUT,DELETE', // 允许的HTTP方法
    allowedHeaders: 'Content-Type,Authorization', // 允许的自定义头
    expressHeaders: 'Content-Type,Authorization', // 允许的自定义头
}))

app.use(bodyParser.urlencoded({ extended: false }))

// 测试一下
// req: 请求对象 request
// res: 响应对象 response
app.get('/', (req, res) => {
    // 发送响应数据
    res.send('Hello World!')
})

const userRouter = require('./router/user');
const registerRouter = require('./router/register');
const authenticateToken = require('./authorization/index');
app.use(express.json());
app.use('/public',registerRouter)
app.use('/protected/*',authenticateToken.verifyToken)
app.use('/protected', userRouter)

// 设置端口
const port = 9008
const server = app.listen(port, () => {
    console.log('Server is running');
    console.log('http://loaclhost:' + port);
})

server.setTimeout(5000);