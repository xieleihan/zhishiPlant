<template>
    <div class="user">
        <div class="container">
            <div class="left">
                <UserAvater />
                <UserPay />
                <UserSetting />
            </div>
            <div class="right">
                <div class="zhanwei"></div>
                <router-view></router-view>
            </div>
        </div>
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
        
        .container{
            width: 200%;
            height: 100%;
            display: flex;
            flex-direction: row;
            .left {
                width: 100%;
                height: 100%;
            }
        
            .right {
                width: 100%;
                height: 100%;
        
                .zhanwei {
                    width: 100%;
                    height: 100%;
                    background-color: skyblue;
                }
            }
        }
    }
</style>