<template>
    <div class="returnBtn" @click="goTopView">
        <img src="../assets/icon/向左箭头.png" alt="">
    </div>
</template>

<script setup lang="ts">
import router from '../router/index';

function goTopView() {
    router.go(-1);
}

</script>

<style scoped lang="less">
@import "../public/main.less";

.returnBtn {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @returnBtnBgColor;

    img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
}
</style>