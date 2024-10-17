// require() 导入/加载
// 导包
require('dotenv').config({path: './public/.env'});
const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')
const svgCaptcha = require('svg-captcha')

// 创建程序
const app = express()

// 增加请求体大小限制（例如设置为 50MB） 
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const db = require('./db/index.js')

// 使用中间件
// app.use(cors())
app.use(cors({
    origin: '*', // 只允许来自这个域名的请求
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // 允许的HTTP方法
    allowedHeaders: 'Content-Type,Authorization', // 允许的自定义头
    expressHeaders: 'Content-Type,Authorization', // 允许的自定义头
	credentials: true, 
}))
// 处理 OPTIONS 请求
// app.options('*', cors(corsOptions));


app.use(bodyParser.urlencoded({ extended: false }))

// 测试一下
// req: 请求对象 request
// res: 响应对象 response
app.get('/', (req, res) => {
    // 发送响应数据
    res.send('Hello World!')
})

// 定义允许的域名列表

app.get('/proxy', async (req, res) => {
  let { url } = req.query;
	// console.log(url)
  

  try {
    // 发送请求到目标 URL
    const response = await axios.get(url);
    res.send({
      "code": 200,
      "data": "+response.data+"
    });
  } catch (error) {
    console.error('Error occurred while fetching data:', error.message);
    res.status(500).send('Error occurred while fetching data');
  }
});

// proxy
app.get('/proxyip', async (req, res) => {
    try {
	// mainland: https://myip.ipip.net/json
	// hongkong: https://ipapi.co/json/
        const response = await axios.get('https://myip.ipip.net/json');
        res.send({
            "code": 200,
            "data": response.data
        });
    } catch (error) {
        res.send({
            "code": 500,
            "message": "ERROR"
        });
    }
});

let vercode;

// 随机生成验证码图片
app.get('/getInfo', (req, res) => {
 // 下面这行代码是随机生成验证码图片和文本并返回给客户端 
  const img = svgCaptcha.create({ 
    size: 4, // 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    color: true, // 验证码是否有彩色
    noise: 3, //干扰线
    background: '#666' // 背景颜色
  })
  console.log(img.text);
  vercode = img.text;
  clearTimeout(timeoutId)
  var timeoutId = setTimeout(()=>{
	  vercode = '';
  },120000)
  res.send(img.data);
})

app.get('/getVerInfo',(req,res) => {
	let {code} = req.query;
	try{
		if(vercode === ''){
			res.send({
				"code": 500,
				"message": "验证码时间超时Timeout"
			})
		}
		else if(code === vercode){
			res.send({
				"code": 200,
				"message": "验证码正确Success"
			})
		}else{
			res.send({
				"code":500,
				"message":"验证码错误no code"
			})
		}
	}catch(err){
		 res.status(500).send('Error occurred while fetching data');
	}
})

const userRouter = require('./router/user');
const registerRouter = require('./router/register');
const authenticateToken = require('./authorization/index');
const publicRouter = require('./router/public');
const homeinfoRouter = require('./router/homeinfo');
const superadmin = require('./router/superadmin')
const windowsRouter = require('./router/windows')
const emailRouter = require('./public/httpapi.js')
// const AiRouter = require('./router/AiRouter')
const BaiduaiRouter = require('./router/BaiduaiRouter')
const UploadRouter = require('./router/UploadDocument')
app.use(UploadRouter)
app.use(express.json());
// app.use(AiRouter)
app.use(BaiduaiRouter)
app.use('/email',emailRouter)
app.use('/super',superadmin)
app.use('/super',windowsRouter)
app.use('/public',registerRouter)
app.use('/public',publicRouter)
app.use('/protected/*',authenticateToken.verifyToken)
app.use('/protected', userRouter)
app.use('/protected',homeinfoRouter)

// 设置端口
const port = 9008
const server = app.listen(port, () => {
    console.log('Server is running');
    console.log('http://loaclhost:' + port);
})

server.setTimeout(100000);