const express = require('express');
const multer = require('multer');
const router = require('express').Router();
var QRCode = require('qrcode');
const crypto = require("crypto")


// const uuid = crypto.randomUUID({ disableEntropyCache: true })

router.post('/qrcode', async (req, res) => {
    const { text } = req.body;
    console.log(text)
    const uuid = crypto.randomUUID({ disableEntropyCache: true })
    QRCode.toDataURL(text, function (err, url) {
        if (err) {
            console.log('error occurred');
            return res.status(500).json({ error: '生成二维码失败' });
        }
        console.log(url)
        res.json({ url, uuid });
    })
})

module.exports = router;