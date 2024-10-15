<template>
    <div class="mcontainer">
        <LeftCom />
        <RightCom />
    </div>
</template>

<script setup lang="ts">
import LeftCom from './ManagementPages/LeftCom.vue';
import RightCom from './ManagementPages/RightCom.vue';

</script>

<style scoped lang="less">
    .mcontainer{
        width: 100%;
        height: calc(100% - 80px);
        display: flex;
        flex-direction: row;
    }
</style>