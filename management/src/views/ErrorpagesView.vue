<template>
    <div class="error">
        <div class="errorbox">
            <div class="title">404 Not Found</div>
            <img src="../assets/images/404.png" alt="">
            <p class="info">你来到无人问津的星空</p>
            <button class="btn" @click="goHome">回到首页</button>
        </div>
        <div class="footer">Copyright© 2024 SouthAki开发所有,<span>{{ bgList[bgIndex].desc }}</span></div>
    </div>
</template>

<script setup lang="ts">
// 随机图片:https://picsum.photos/3840/2160
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
    if (sessionStorage.getItem('token')) {
        router.push({ name: 'Management' });
    } else {
        router.push({ name: 'Startpages' });
    }
};

const bgList = [
    {
        url: new URL('../assets/images/bg/星空.jpg', import.meta.url).href,
        desc: "背景为星月夜,致敬伟大的画家--梵高."
    },
    {
        url: new URL('../assets/images/bg/Monet_-_Impression,_Sunrise.jpg', import.meta.url).href,
        desc: "背景为印象日出,致敬伟大的画家--莫奈."
    },
    {
        url: new URL('../assets/images/bg/1045-3840x2160.jpg', import.meta.url).href,
        desc: "没有比脚更长的路,没有比人更高的山"
    },
    {
        url: new URL('../assets/images/bg/404-3840x2160.jpg', import.meta.url).href,
        desc: "旅行就是为了见到不一样的风景,也是为了成长"
    },
    {
        url: new URL('../assets/images/bg/sea.jpg', import.meta.url).href,
        desc: "暖阳下的海风还是一样"
    }
];


const bgIndex = ref(Math.floor(Math.random() * bgList.length));

onMounted(() => {
    const errorElement = document.querySelector('.error') as HTMLElement;
    if (errorElement) {
        errorElement.style.backgroundImage = `url(${bgList[bgIndex.value].url})`;
    }
});
</script>

<style scoped lang="less">
@import '../public/publiccss.less';
    .error{
        width: 100%;
        height: 100%;
        // background: url('../assets/images/bg/星空.jpg') no-repeat;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: flex;
        // flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        .errorbox{
            width: 500px;
            height: 500px;
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: @radius;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            .title{
                font-size: 40px;
                font-weight: bold;
            }
            .info{
                color: black;
                letter-spacing: 10px;
            }
            img{
                width: 400px;
                height: 250px;
            }
            .btn{
                width: 100px;
                height: 40px;
                border: 1px solid @themeColor;
                border-radius: @radius;
                background-color: white;
                color: @themeColor;
            }
        }
        .footer{
            width: 100%;
            text-align: center;
            height: 30px;
            line-height: 30px;
            position: absolute;
            bottom: 0px;
            left: 50%;
            color: #ccc;
            transform: translateX(-50%);
        }
    }
</style>