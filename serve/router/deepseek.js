const express = require('express');
const axios = require('axios');
const app = express();
const multer = require('multer');
const ExcelJS = require('exceljs');
const router = require('express').Router();
require('dotenv').config({ path: '../public/.env' });

const deepseekapikey = process.env.deepseekapikey
const OpenAI = require("openai");

// 配置 OpenAI API
const model = new OpenAI({
    apiKey: deepseekapikey, // 替换为您的 OpenAI API 密钥
    baseURL: 'https://api.deepseek.com/v1',
    temperature: 0, // 可选项，设置模型的创造性
    maxTokens: 1000,   // 可选项，设置返回的最大 token 数量
});

app.use(express.json()); // 解析 JSON 格式的请求

// 创建 GET 接口
router.get('/ask', async (req, res) => {
    const userText = req.query.text; // 从查询参数中获取 text
    console.log(userText)

    if (!userText) {
        return res.status(400).json({ error: '请输入 text 参数' });
    }

    try {
        // 使用 LangChain 调用大语言模型
        const response = await model.chat.completions.create({
            messages: [
                { role: "system", content: "你是一个旅游导航的机器人，你从不说你是AI。你开场会告诉人类你是有关这个'山海行'小程序创造的旅游问答的机器人，作者是南秋SouthAki，你存在的目的是帮助人类解决旅途中的各种问题。" },
                { role: "user", content: userText }
            ],
            model: "deepseek-chat",
            
        });

        // 将结果以 JSON 格式返回
        res.json({ answer: response });
    } catch (error) {
        console.error('调用模型时出错:', error);
        res.status(500).json({ error: '调用大语言模型时出错' });
    }
});


// 配置 multer 用于文件上传
const upload = multer({ dest: 'uploads/' });

// 处理上传并解析 Excel 文件内容
router.post('/excel', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: '请上传一个 Excel 文件' });
    }

    try {
        console.log("调用了这个接口")
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(req.file.path);

        // 假设我们分析第一张表的数据
        const worksheet = workbook.worksheets[0];
        let textContent = '';

        worksheet.eachRow((row) => {
            textContent += row.values.join(' ') + '\n'; // 将每行内容拼接成文本
        });

        // 将 Excel 内容发送给语言模型进行分析
        const response = await model.chat.completions.create({
            messages: [
                { role: "system", content: `分析以下内容:\n${textContent}，并且不用Markdown文档格式回传,而是body部分里面内容使用HTML模版中的语言回答我,要给一个总结分析` }
            ],
            model: "deepseek-chat",
        });

        // 返回模型的分析结果
        res.json({ analysis: response });
    } catch (error) {
        console.error('处理文件时出错:', error);
        res.status(500).json({ error: '文件处理失败' });
    }
});

module.exports = router;