<template>
    <div class="start" v-if="!isBigOpen">
        <div v-if="!isOpen" class="plant">
            <div class="itemBox" v-if="!isSmallOpen">
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
            </div>
            <p v-if="isSmallOpen">进入系统中...</p>
        </div>
        <div v-if="isOpen" class="container">
            <div class="center">
                <img class="images" src="../assets/icon/星球插画.png" alt="">
                <p class="title">知识星球</p>
            </div>
            <div class="btnBox">
                <router-link to="/login" class="btn" @click="goToLogin">登录</router-link>
                <router-link to="/register" class="btn" @click="goToRegister">注册</router-link>
            </div>
            <span class="skip" @click="goToHome">Skip</span>
        </div>
    </div>
    <router-view name="StartPages"></router-view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router  from '../router/index';
import { useHomeStore } from '../stores/home'

const homeStore = useHomeStore();

function goToHome() {
    homeStore.close();
    // 跳转到home
    router.push({ name: 'home' });    
}

function goToLogin() {
    isBigOpen.value = !isBigOpen.value;
}

function goToRegister() {
    isBigOpen.value = !isBigOpen.value;
}

const isOpen = ref(false);
const isSmallOpen = ref(false);
const isBigOpen = ref(false);

setTimeout(() => {
    isSmallOpen.value = true;
}, 4000);
setTimeout(() => {
    isOpen.value = true;
}, 5000);
</script>

<style scoped lang="less">
    .start{
        width: 100%;
        height: 100%;
        .plant{
            width: 100%;
            height: 100%;
            // background-color: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            .itemBox{
                width: 300px;
                height: 300px;
                // background-color: skyblue;
                border-radius: 50%;
                position: relative;
                .item{
                    width: 30px;
                    height: 30px;
                    
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    
                    &:nth-child(1){
                        top: 0;
                        left: 50%;
                        background-color: #ea4335;
                        animation: spiralToCenter 3s forwards;
                        animation-delay: 0.2s;
                    }
                    &:nth-child(2){
                        top: 15%;
                        left: 50%;
                        background-color: #fbbc05;
                        animation: spiralToCenter1 3s forwards;
                        animation-delay: 0.4s;
                    }
                    &:nth-child(3){
                        top: 30%;
                        left: 50%;
                        background-color: #34a853;
                        animation: spiralToCenter2 3s forwards;
                        animation-delay: 0.6s;
                    }
                    &:nth-child(4){
                        top: 45%;
                        left: 50%;
                        background-color: #4285f4;
                        animation-delay: 2s;
                        animation: spiralToCenter3 4s forwards;
                    }
                }
            }
        }
        .container{
            width: 100%;
            height: 100%;
            
            position: relative;
            .skip{
                position: absolute;
                top: 40px;
                right: 30px;
                color: #ccc;
            }
            .center{
                position: absolute;
                display: flex;
                align-items: center;
                flex-direction: column;
                top: 25%;
                left: 50%;
                transform: translateX(-50%);
                .images {
                        width: 142px;
                        height: 90px;
                        margin-bottom: 30px;
                    }
                
                    .title {
                        font-size: 40px;
                        // font-weight: bold;
                        letter-spacing: 3px;
                    }
            }
            .btnBox{
                position: absolute;
                bottom: 10%;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                flex-direction: column;
                width: 75%;
                .btn{
                    height: 50px;
                    margin-bottom: 10px;
                    border-radius: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &:nth-child(1){
                        background-color: #4285f4;
                        color: white;
                    }
                    &:nth-child(2){
                        background-color: white;
                        border: 1px solid #4285f4;
                        color: #4285f4;
                    }
                }
            }
        }


        .layout{
            width: 100%;
            height: calc(100% - 70px);
        }
    }

@keyframes spiralToCenter {
    0% {
        transform: rotate(0deg) translate(0px,-15px) scale(1);
        transform-origin: 0 150px;
    }

    100% {
        transform: rotate(720deg) translate(-15px,135px) scale(1);
        transform-origin: 0 135px;
    }
}
@keyframes spiralToCenter1 {
    0% {
        transform: rotate(0deg) translate(0px, -15px) scale(1);
        transform-origin: 0 90px;
    }

    100% {
        transform: rotate(720deg) translate(-15px, 90px) scale(1);
        transform-origin: 0 135px;
    }
}
@keyframes spiralToCenter2 {
    0% {
        transform: rotate(0deg) translate(0px, -15px) scale(1);
        transform-origin: 0 45px;
    }

    100% {
        transform: rotate(720deg) translate(-15px, 45px) scale(1);
        transform-origin: 0 100px;
    }
}
@keyframes spiralToCenter3 {
    0% {
        transform: rotate(0deg) translate(0px, -15px) scale(1);
        transform-origin: 0 0px;
    }

    100% {
        transform: rotate(720deg) translate(-15px, 0px) scale(1);
        transform-origin: 0 75px;
    }
}
</style>