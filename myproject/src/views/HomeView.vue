<template>
    <keep-alive>
        <div class="home">
            <HomeTop />
            <div class="container">
                <div class="banner">
                    <van-swipe :autoplay="3000" lazy-render>
                        <van-swipe-item v-for="image in images" :key="image">
                            <img :src="image" />
                        </van-swipe-item>
                    </van-swipe>
                </div>
                <FunctionAreo></FunctionAreo>
                <YiyanCom></YiyanCom>
                <DailyCom></DailyCom>
                <NewsCom></NewsCom>
            </div>
        </div>
    </keep-alive>
</template>

<script setup lang="ts">
import HomeTop from '@/components/HomeTop.vue';
import FunctionAreo from '@/components/FunctionAreo.vue';
import DailyCom from '@/components/DailyCom.vue';
import NewsCom from '@/components/NewsCom.vue';
import YiyanCom from '@/components/YiyanCom.vue';

const images = [
    'https://picsum.photos/1920/1080?1',
    'https://picsum.photos/1920/1080?2',
    'https://picsum.photos/1920/1080?3',
    'https://picsum.photos/1920/1080?4',
    'https://picsum.photos/1920/1080?5',
    'https://picsum.photos/1920/1080?6'
];

</script>

<style scoped lang="less">
@import "../public/main.less";
    .home{
        width: 100%;
        height: calc(100% - 70px);
        border-bottom: 1px solid #ccc;
        overflow-y: scroll;
        
        .container{
            width: 100%;
            height: 200px;
            .banner{
                width: 100%;
                height: 100%;
                margin-top: 70px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>