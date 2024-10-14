<template>
    <div class="home-wrapper">
        <div class="home" v-if="!homeStore.homelook" v-bind="$attrs">
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
        <div class="router-view-wrapper" v-if="homeStore.homelook">
            <router-view name="look"></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import HomeTop from '@/components/HomeTop.vue';
import FunctionAreo from '@/components/FunctionAreo.vue';
import DailyCom from '@/components/DailyCom.vue';
import NewsCom from '@/components/NewsCom.vue';
import YiyanCom from '@/components/YiyanCom.vue';

// 导入pinia
import { useHomeStore } from '../stores/home'
const homeStore = useHomeStore();

import { onMounted } from 'vue';

onMounted(() => {
    homeStore.homeLookClose();
})

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

.home-wrapper {
    width: 100%;
    height: 100%;
}

.home {
    width: 100%;
    height: calc(100% - 10px);
    border-bottom: 1px solid #ccc;
    overflow-y: scroll;

    .container {
        width: 100%;
        height: 200px;

        .banner {
            width: 100%;
            height: 100%;
            margin-top: 70px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}

.router-view-wrapper {
    width: 100%;
    height: 100%;
}
</style>