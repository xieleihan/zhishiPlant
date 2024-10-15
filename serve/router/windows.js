const express = require('express');
const nodeCMD = require('node-cmd');
const os = require('os-utils');
const { exec } = require('child_process');

const router = express.Router();

const serverInfo = {
    cpuUsage: 0,
    gpuUsage: 0,
	intelGpuUsage: 0,
    freeMem: 0,
    totalMem: 0
};

/**
 * 获取系统内存情况
 */
function getMem() {
    serverInfo.freeMem = os.freemem();
    serverInfo.totalMem = os.totalmem();
}

/**
 * 获取系统 CPU 利用率
 */
async function getCPUUsage() {
    try {
        let promise = new Promise((resolve, reject) => {
            os.cpuUsage(function(v) {
                resolve(v);
            });
        });
        serverInfo.cpuUsage = await promise;
    } catch (error) {
        console.error('Error getting CPU usage:', error);
        serverInfo.cpuUsage = 0; // 遇到错误时设置默认值
    }
}

/**
 * 获取系统 GPU (NVIDIA) 利用率
 */
async function getGPUUsage() {
    try {
        let promise = new Promise(resolve => {
            nodeCMD.get('nvidia-smi -q -d UTILIZATION', (e, b, c) => {
                if (!e) {
                    let a = b.split('\r\n').find(s => s.indexOf('Gpu') >= 0 && s.indexOf('%') >= 0);
                    if (a) {
                        let start = a.indexOf(':') + 2;
                        let end = a.indexOf('%') - 1;
                        let ss = a.substring(start, end);
                        resolve(parseFloat(ss));
                    } else {
                        resolve(0);
                    }
                } else {
                    resolve(0); // 如果出错，返回 0
                }
            });
        });
        serverInfo.gpuUsage = await promise;
    } catch (error) {
        // console.error('Error getting GPU usage:', error);
        serverInfo.gpuUsage = 0; // 遇到错误时设置默认值
    }
}

/**
 * 获取系统 GPU (Intel) 利用率
 */
async function getIntelGPUUsage() {
    try {
        let promise = new Promise(resolve => {
            exec('intel_gpu_top -J -d 1', (error, stdout, stderr) => {
                if (!error) {
                    try {
                        const output = JSON.parse(stdout);
                        if (output && output.engines) {
                            const renderEngine = output.engines.find(engine => engine.class === 'Render');
                            if (renderEngine && renderEngine.busy) {
                                resolve(parseFloat(renderEngine.busy));
                            } else {
                                resolve(0);
                            }
                        } else {
                            resolve(0);
                        }
                    } catch (parseError) {
                        resolve(0);
                    }
                } else {
                    resolve(0);
                }
            });
        });
        serverInfo.intelGpuUsage = await promise;
    } catch (error) {
        console.error('Error getting Intel GPU usage:', error);
        serverInfo.intelGpuUsage = 0; // 遇到错误时设置默认值
    }
}

// 每 20 秒更新一次系统信息
setInterval(() => {
    getCPUUsage();
    getIntelGPUUsage()
    getMem();
}, 20000);

// 定义 GET 请求接口来获取系统信息
router.get('/server-info', (req, res) => {
    res.json({
        code: 200,
        message: 'Success',
        data: serverInfo
    });
});

module.exports = router;