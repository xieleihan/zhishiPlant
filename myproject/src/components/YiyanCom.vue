<template>
    <div class="yiyan">
        {{ yiyan }}
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { onMounted } from 'vue';

onMounted(() => {
    setYiyan()
})

function setYiyan() {
    const hour = new Date().getHours();
    if (hour < 10 && hour >= 8) {
        setTimeout(() => {
            yiyan.value = '早上好,希望今天是个好天气,加油'
        }, deply)
    }
    if (hour >= 10 && hour < 14) {
        setTimeout(() => {
            yiyan.value = '中午好,好好吃饭,好好休息'
            setTimeout(() => {
                getOneWord()
            }, 10000)
        }, deply)
    }
    if (hour >= 14 && hour < 18) {
        setTimeout(() => {
            yiyan.value = '下午好,喝杯下午茶咋样,你请客'
            setTimeout(() => {
                getOneWord()
            }, 10000)
        }, deply)
    }
    if (hour >= 18 && hour < 24) {
        setTimeout(() => {
            yiyan.value = '晚上好,开始夜生活,你打算干嘛'
            setTimeout(() => {
                getOneWord()
            }, 10000)
        }, deply)
    }
    if (hour >= 0 && hour < 6) {
        setTimeout(() => {
            yiyan.value = '早点休息,明天是一个新的开始'
            setTimeout(() => {
                getOneWord()
            }, 10000)
        }, deply)
    }
    if (hour >= 6 && hour < 8) {
        setTimeout(() => {
            yiyan.value = '一日之计在于晨'
            setTimeout(() => {
                getOneWord()
            }, 10000)
        }, deply)
    }
}

function getOneWord() {
    axios.get('https://v1.hitokoto.cn')
        .then(res => {
            // console.log(res.data.hitokoto)
            yiyan.value = res.data.hitokoto
        }).catch(() => {
            yiyan.value = '🖥️一言服务器离线了,请稍后再试...'
        })
}

const yiyan = ref("知识星球 -- 一个专注于分享知识的社区")
const deply:number = 5000
</script>

<style scoped lang="less">
    .yiyan{
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        text-wrap: nowrap;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 20px;
    }
</style>