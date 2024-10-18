<template>
    <div class="server">
        <div class="right">
            <p>CPU占用情况</p>
            <van-circle v-model:current-rate="currentRate1" :rate="100" :color="gradientColor" :text="numberText1" />
            <p>GPU占用情况</p>
            <van-circle v-model:current-rate="currentRate2" :rate="100" :color="gradientColor" :text="numberText2" />
            <p>内存占用情况</p>
            <van-circle v-model:current-rate="currentRate3" :rate="100" :color="gradientColor" :text="numberText3" />
        </div>
        <div class="left">
            <ul class="ipinfo">
                <li>
                    <span>服务器IP：</span>
                    <span>{{ ip }}</span>
                </li>
                <li>
                    <span>服务器端口：</span>
                    <span>26112</span>
                </li>
                <li>
                    <span>服务器状态：</span>
                    <span>{{ statusstring }}</span>
                </li>
                <li>
                    <span>服务器位置:</span>
                    <span>{{ city }}</span>
                </li>
                <li>
                    <span>网络运营商:</span>
                    <span>{{ operator }}</span>
                </li>
            </ul>
            <div class="mapBox">
                <BaiduMap />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import BaiduMap from './BaiduMap.vue';

// 定义三个进度的 rate 值
const currentRate1 = ref(0);
const currentRate2 = ref(0);
const currentRate3 = ref(0);

// 定义IP信息
const ip = ref('');
const statusstring = ref('正常');
const city = ref('香港');
const operator = ref('联通');

// 定义渐变颜色
const gradientColor = {
    '0%': '#3fecff',
    '100%': '#6149f6',
};

// 计算每个 circle 的文本值
const numberText1 = computed(() => currentRate1.value.toFixed(0) + '%');
const numberText2 = computed(() => currentRate2.value.toFixed(0) + '%');
const numberText3 = computed(() => currentRate3.value.toFixed(0) + '%');

let socket: WebSocket | null = null;

// 获取服务器信息 (IP等)
onMounted(() => {
    axios.get('https://frp-leg.top:26112/proxyip').then((res) => {
        ip.value = res.data.data.data.ip;
        if (res.data.code === 200) {
            statusstring.value = '正常';
        } else {
            statusstring.value = '异常';
        }
        city.value = res.data.data.data.location[2];
        operator.value = res.data.data.data.location[4];
    });

    // 创建 WebSocket 连接
    socket = new WebSocket('ws://157.122.209.79:61261'); // 修改为你的 WebSocket URL

    socket.onopen = () => {
        console.log('WebSocket 已连接');
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('从 WebSocket 接收到数据:', data);
        // 更新实时数据
        currentRate1.value = data.cpuUsage ? parseFloat((data.cpuUsage * 100).toFixed(2)) : 0;
        currentRate2.value = data.gpuUsage ? parseFloat((data.gpuUsage * 100).toFixed(2)) : 0;
        currentRate3.value = data.freeMem && data.totalMem
            ? parseFloat(((data.freeMem / data.totalMem) * 100).toFixed(2))
            : 0;
    };

    socket.onclose = () => {
        console.log('WebSocket 连接已关闭');
    };

    socket.onerror = (error) => {
        console.error('WebSocket 出现错误:', error);
    };

    // 定时使用 axios 请求作为备用
    let intervalId = setInterval(() => {
        axios.get('https://frp-leg.top:26112/super/server-info').then((res) => {
            currentRate1.value = res.data.data.cpuUsage.toFixed(2) * 100;
            currentRate2.value = res.data.data.gpuUsage === 0
                ? 0
                : res.data.data.gpuUsage.toFixed(2) * 100;
            currentRate3.value = parseFloat((res.data.data.freeMem / res.data.data.totalMem).toFixed(2)) * 100;
        });
    }, 20000);

    onBeforeUnmount(() => {
        // 清除定时器
        clearInterval(intervalId);
        // 关闭 WebSocket 连接
        if (socket) {
            socket.close();
        }
    });
});
</script>



<style scoped lang="less">
@import "../../public/publiccss.less";

    .server{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        .left{
            width: 70%;
            height: 100%;
            padding: 20px 10px;
            display: flex;
            .ipinfo{
                border: 1px solid #ccc;
                width: 30%;
                height: 100%;
                border-radius: @radius 0 0 @radius;
                display: flex;
                flex-direction: column;
                padding: 0 20px;
                border-right: none;
                li{
                    width: 100%;
                    height: calc(100% / 5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-bottom: 1px solid #ccc;
                    &:last-child{
                        border-bottom: none;
                    }
                }
            }
            .mapBox{
                width: 70%;
                height: 100%;
                border: 1px solid #ccc;
                border-radius: 0 @radius @radius 0;
                overflow: hidden;
            }
        }
        .right{
            width: 30%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
        }
    }
</style>