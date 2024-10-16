<template>
    <div class="topview">
        <div class="title">
            <img src="../assets/images/peacock_flat.png" alt="">
            知识星球管理后台
        </div>
        <div class="rightBox">
            <div class="left">
                <span class="nowdate">{{ date }}</span>
                <img src="../assets/icon/用户.png" alt="">
                <span>Administer</span><span>,你好</span>
            </div>
            <div class="right" @click="showLogoutDialog">
                <img src="../assets/icon/logout.png" alt="">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '../router/index';
import { useHomeStore } from '../stores/home'

const homeStore = useHomeStore();

import { showConfirmDialog, showToast } from 'vant';

const showLogoutDialog = () => {
    showConfirmDialog({
        title: '确认退出',
        message: '你确定要退出吗？',
    })
        .then(() => {
            // 用户确认操作后的逻辑
            showToast('Administer,退出程序中...');
            sessionStorage.removeItem('token');
            const timeoutId = setTimeout(() => {
                showToast('Administer,退出成功');
                router.push('/startpages');
            },2000)
            homeStore.open();
        })
        .catch(() => {
            // 用户取消操作后的逻辑
            showToast('Administer,你已取消退出程序');
        });
};

const intervalId = setInterval(() => {
    date.value = new Date().toLocaleString();
}, 1000);

const date = ref(new Date().toLocaleString());
</script>

<style scoped lang="less">
@import '../public/publiccss.less';
    .topview{
        width: 100%;
        height: 80px;
        background-color: @themeColor;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
        .title{
            color: #fff;
            font-size: 30px;
            display: flex;
            align-items: center;
            flex-direction: row;
            img{
                width: 50px;
                height: 50px;
                margin-right: 10px;
            }
        }
        .rightBox{
            display: flex;
            flex-direction: row;
            align-items: center;
            img{
                width: 30px;
                height: 30px;
            }
            .left{
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-right: 20px;
                color: white;
                .nowdate{
                    margin-right: 20px;
                    cursor: default;
                }
                img{
                    margin-right: 10px;
                    width: 25px;
                    height: 25px;
                    cursor: pointer;
                }
            }
            .right{
                img{
                    cursor: pointer;
                }
            }
        }
    }
</style>