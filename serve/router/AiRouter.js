const router = require('express').Router();
require('dotenv').config({path: '../public/.env'});
const OpenAI = require('openai');

// 创建 OpenAI 实例
const openai = new OpenAI({
    apiKey: process.env.DASHSCOPE_API_KEY,
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
});

// 创建一个 GET 请求的接口
router.get('/openai', async (req, res) => {
    const userInput = req.query.input;  // 从请求的 query 中获取 input 参数

    if (!userInput) {
        return res.status(400).json({ error: "缺少 input 参数" });
    }

    try {
        // 调用 OpenAI 模型
        const completion = await openai.chat.completions.create({
            model: "qwen-plus",  // 模型列表
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: userInput }
            ],
        });

        // 返回模型的响应结果
        res.json({
            code: 200,
            message: "成功",
            response: completion.choices[0].message.content
        });

    } catch (error) {
        console.error(`错误信息：${error}`);
        res.status(500).json({
            code: 500,
            message: "调用 OpenAI API 失败",
            error: error.message,
        });
    }
});


module.exports = router;