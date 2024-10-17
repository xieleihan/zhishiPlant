const express = require('express');
const axios = require('axios');
const app = express();
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// 设置文件存储路径和文件名规则
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 设置文件上传后的存储目录
        cb(null, './public/document') // 存放到当前目录下的 'uploads/' 文件夹中
    },
    filename: function (req, file, cb) {
        // 设置文件的存储名称，可以使用文件的原始名称
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// 创建上传实例，限制上传文件的大小
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 } }); // 限制文件大小为5MB

// 处理文件上传的 POST 请求
router.post('/upload', upload.array('files', 10), (req, res) => {
    try {
        const fileNames = req.files.map(file => file.filename); // 获取所有文件的文件名
        res.json({ fileNames });
    } catch (error) {
        res.status(400).send('Error uploading files');
    }
});

module.exports = router;