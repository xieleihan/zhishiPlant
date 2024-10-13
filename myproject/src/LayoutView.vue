<template>
    <div class="layout">
        <router-view class="routerView"></router-view>
        <keep-alive>
            <NavCom />
        </keep-alive>
    </div>
</template>

<script setup lang="ts">
import NavCom from './components/NavCom.vue'

</script>

<style lang="less" scoped>
.layout {
    width: 100%;
    height: calc(100% - 70px);
    .routerView{
        width: 100%;
        height: 100%;
    }
}
</style>