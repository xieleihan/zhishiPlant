<template>
    <div class="tapnav">
        <div class="navTapContainer">
            <div class="left" @click="goTopView">
                <img src="../../assets/icon/left.png" alt="">
            </div>
            <div class="right">
                <div class="item">
                    <img src="../../assets/icon/评论.png" alt="">
                </div>
                <div class="item">
                    <img src="../../assets/icon/赞.png" alt="">
                </div>
                <div class="item">
                    <img src="../../assets/icon/收藏.png" alt="">
                </div>
                <div class="item" @click="openShare">
                    <img src="../../assets/icon/分享.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '../../router/index';

// 导入pinia
import { useHomeStore } from '../../stores/home'
const homeStore = useHomeStore();

function goTopView(): void{
    // 还需要添加一个底部的恢复
    homeStore.homeLookClose();
    router.go(-1);
}

// 打开分享
const emit = defineEmits(['showShare']);
function openShare(): void{
    emit('showShare', true);
}
</script>

<style scoped lang="less">
    .tapnav{
        width: 100%;
        height: 50px;
        display: flex;
        // position: fixed;
        // top: 0;
        justify-content: center;
        align-items: center;
        background-color: #f6f6f6;
    
        .navTapContainer {
            width: 95%;
            height: 30px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
    
            .left,
            .right {
                height: 100%;
            }
    
            .left {
                width: 30px;
                border-right: 1px solid #ccc;
                margin-left: 10px;
                padding-right: 10px;
    
                img {
                    width: 100%;
                    height: 100%;
                    aspect-ratio: 1/1;
                }
            }
    
            .right {
                width: 85%;
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;
                align-items: center;
    
                .item {
                    width: 30px;
                    height: 30px;
    
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>