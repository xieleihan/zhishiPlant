<template>
    <div class="rightcom">
        <StateCom />
        <div class="rightContainer">
            <AccountManagement></AccountManagement>
        </div>
        <div class="rightBottom">
            <van-notice-bar left-icon="volume-o" text="请谨慎操作上面的数据,数据丢失无价,后台不做任何备份." />
        </div>
    </div>
</template>

<script setup lang="ts">
import StateCom from './StateCom.vue';
import AccountManagement from './AccountManagement.vue';
</script>

<style scoped lang="less">
@import "../../public/publiccss.less";
    .rightcom{
        width: calc(100% - 15%);
        height: 100%;
        position: relative;
        .rightContainer{
            width: 95%;
            height: 70%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            border-radius: @radius;
            overflow-y: scroll;
            border: 1px solid #ccc;
        }
        .rightBottom{
            width: 100%;
            position: absolute;
            bottom: 0;
        }
    }
</style>