<template>
    <div class="state">
        <div class="stateContainer clearfix">
            <div :class="cell.isIndex === 0 ? 'active':''" class="card fl">
                账户管理
                <div class="icon">
                    <van-icon name="close" />
                </div>
            </div>
            <div :class="cell.isIndex === 1 ? 'active':''" class="card fl">
                信息管理
                <div class="icon">
                    <van-icon name="close" />
                </div>
            </div>
            <div :class="cell.isIndex === 2 ? 'active':''" class="card fl">
                首页添加
                <div class="icon">
                    <van-icon name="close" />
                </div>
            </div>
            <div :class="cell.isIndex === 3 ? 'active':''" class="card fl">
                发送信息
                <div class="icon">
                    <van-icon name="close" />
                </div>
            </div>
            <div :class="cell.isIndex === 4 ? 'active' : ''" class="card fl">
                服务器状态
                <div class="icon">
                    <van-icon name="close" />
                </div>
            </div>
            <div class="inputBox">
                <img src="../../assets/icon/Search.png" alt="">
                <input v-model="value" type="text" placeholder="请输入搜索内容">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import { useCellStore } from '@/stores/cell';
import { useAccountStore } from '@/stores/accountdata';
const cell = useCellStore();
const account = useAccountStore();


const value = ref('');

watch(() => value.value, (newVal) => {
    account.setSearchString(newVal);
    account.log();
})
</script>

<style scoped lang="less">
@import '../../public/publiccss.less';
    .state{
        width: 95%;
        height: 50px;
        position: absolute;
        top: 30px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        left: 50%;
        transform: translateX(-50%);
        border: 1px solid @themeColor;
        // border-radius: @radius;
        // overflow: hidden;
        .stateContainer{
            height: 30px;
            width: 100%;
            // min-width: 100%;
            // overflow-x: scroll;
            color: white;
            position: relative;
            .card{
                cursor: default;
                width: 100px;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: @themeColor;
                position: relative;
                margin-right: 8px;
                &.active{
                    background-color: white;
                    color: @themeColor;
                    border: 1px solid @themeColor;
                }
                &:last-child{
                    margin-right: 0;
                }
                .icon{
                    cursor: pointer;
                    position: absolute;
                    right: 5px;
                    top: 5px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: white;
                    color: @themeColor;
                    width: 10px;
                    height: 10px;
                    text-align: center;
                    line-height: 10px;
                }
            }
            .inputBox{
                width: 300px;
                height: 10px;
                position: absolute;
                right: 0px;
                top: 50%;
                transform: translateY(-50%);
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: transparent;
                input{
                    width: 100%;
                    height: 30px;
                    padding-left: 25px;
                    color: black;
                }
                img{
                    width: 20px;
                    height: 20px;
                    position: absolute;
                    left: 5px;
                }
            }
        }
    }
</style>