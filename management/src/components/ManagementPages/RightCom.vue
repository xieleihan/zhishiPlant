<template>
    <div class="rightcom">
        <StateCom />
        <div class="rightContainer">
            <AccountManagement v-show="cell.isIndex === 0"></AccountManagement>
            <ServerState v-show="cell.isIndex === 4"></ServerState>
            <SendInfonation v-show="cell.isIndex === 3"></SendInfonation>
            <HomeinfoManagement v-show="cell.isIndex === 2"></HomeinfoManagement>
            <TrueHomeinfomanagement v-show="cell.isIndex === 1"></TrueHomeinfomanagement>
        </div>
        <div class="rightBottom">
            <van-notice-bar left-icon="volume-o" text="请谨慎操作上面的数据,数据丢失无价,后台不做任何备份." />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCellStore } from '@/stores/cell';
const cell = useCellStore();

import StateCom from './StateCom.vue';
import AccountManagement from './AccountManagement.vue';
import ServerState from './ServerState.vue';
import SendInfonation from './SendInfonation.vue';
import HomeinfoManagement from './HomeinfoManagement.vue';
import TrueHomeinfomanagement from './TrueHomeinfomanagement.vue';
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