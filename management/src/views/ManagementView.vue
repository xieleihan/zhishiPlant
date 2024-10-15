<template>
    <div class="managenment">
        <ManagementTopcom />
        <ManagementContainer />
    </div>
</template>

<script setup lang="ts">
import ManagementTopcom from '@/components/ManagementTopcom.vue';
import ManagementContainer from '@/components/ManagementContainer.vue';

</script>

<style scoped lang="less">
    .managenment{
        width: 100%;
        height: 100%;
    }
</style>