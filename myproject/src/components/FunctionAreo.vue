<template>
    <div class="areo">
        <div class="left">
            {{ date }}
        </div>
        <div class="right">
            <div class="weatherLeft">
                <i :class="`qi-${iconnum}`"></i>
            </div>
            <div class="weatherRight">
                <p>{{ temp }}°C</p>
                <p class="city">{{ city }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import axios from 'axios';

onMounted(() => {
    // 通过ip获取经纬度,获取成功则将信息传递给天气和城市函数
    axios.get('https://ipapi.co/json/')
        .then((res) => {
            // console.log(res.data.city, res.data.latitude, res.data.longitude);
            const { latitude, longitude } = res.data;
            getCityInfo(latitude, longitude);
            getWeatherInfo(latitude, longitude);
        }).catch(() => {
            getCityInfo(22.27, 114.16);
            getWeatherInfo(22.27, 114.16);
        });
})

// 获取城市函数
function getCityInfo(latitude: number, longitude: number): void{
    axios.get(`https://geoapi.qweather.com/v2/city/lookup?key=${api_key}&location=${longitude},${latitude}`).then((res) => {
        // console.log(res.data.location[0].adm2); // 这是城市名称信息
        city = res.data.location[0].adm2;
    }).catch((err) => {
        console.log(err);
    })
}

// 获取天气函数
function getWeatherInfo(latitude: number, longitude: number):void {
    axios.get(`https://devapi.qweather.com/v7/weather/now?key=${api_key}&location=${longitude},${latitude}`).then((res) => {
        // console.log(res.data.now.temp, res.data.now.icon)
        temp = res.data.now.temp;
        iconnum = res.data.now.icon;
    }).catch((err) => {
        console.log(err);
    })
}

function updateTime(): void {
    date.value = new Date().toLocaleString();
}
setInterval(updateTime, 1000);

const date = ref(new Date().toLocaleString());
const api_key: string = '7d2051100a0a467386d0cafa66e3ecb9'; // 定义一个和风天气的api_key,这里需要更换成自己的
// 天气相关的变量
let city: string;
let iconnum: number;
let temp: number;


</script>

<style scoped lang="less">
    .areo{
        width: 100%;
        padding: 0 20px;
        height: 55px;
        margin-top: 11px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .left{
            width: 60%;
            height: 100%;
            color: #ccc;
            font-weight: bold;
            font-size: 18px;
            display: flex;
            align-items: center;
            flex-wrap: nowrap;
            text-wrap: nowrap;
        }
        .right{
            width: 34%;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            .weatherLeft{
                margin-right: 15px;
                i{
                    font-size: 40px;
                }
            }
            .weatherRight{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .city{
                    margin-top: 5px;
                }
            }
        }
    }
</style>