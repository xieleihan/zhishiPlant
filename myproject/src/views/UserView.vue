<template>
    <div class="user">
        <UserAvater />
        <UserPay />
        <UserSetting />
    </div>
</template>

<script setup lang="ts">
import UserAvater from '@/components/UserCom/UserAvater.vue';
import UserPay from '@/components/UserCom/UserPay.vue';
import UserSetting from '@/components/UserCom/UserSetting.vue';

</script>

<style scoped lang="less">
    .user{
        width: 100%;
        height: 100%;
        background-color: #f3f7f8;
    }
</style>