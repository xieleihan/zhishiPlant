<template>
    <div class="account">
        <ul>
            <li>
                <div class="name">用户名</div>
                <div class="name">用户邮箱</div>
                <div class="name">用户密码</div>
                <div class="name">操作区域</div>
            </li>
            <li>
                <div class="info">111</div>
                <div class="info">111@11.com</div>
                <div class="info">111</div>
                <div class="info">
                    <button v-for="(item,index) in list" :key="index">{{ item.name }}</button>
                </div>
            </li>
            <li>
                <div class="info">111</div>
                <div class="info">111@11.com</div>
                <div class="info">111</div>
                <div class="info">
                    <button v-for="(item, index) in list" :key="index">{{ item.name }}</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const list = ref([
        {
            name: "修改",
            id: 1
        },
        {
            name: "删除",
            id: 2
        },
        {
            name: "复制",
            id: 3
        }
    ])
</script>

<style scoped lang="less">
@import "../../public/publiccss.less";
    .account{
        width: 100%;
        height: 100%;
        padding: 10px;
        ul{
            width: 100%;
            height: 100%;
            li{
                display: flex;
                flex-direction: row;
                border-bottom: 1px solid #ccc;
                &:first-child{
                    border-top: 1px solid #ccc;
                }
                .name{
                    width: calc(100% / 4);
                    height: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .info{
                    width: calc(100% / 4);
                    height: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-wrap: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: flex;
                    align-items: center;
                    justify-content: space-evenly;
                    button{
                        width: calc(100% / 3 - 40px);
                        height: 30px;
                        border-radius: @radius;
                        color: white;
                        &:nth-child(1){
                            background-color: #2c7bed;
                        }
                        &:nth-child(2){
                            background-color: #e43c2f;
                        }
                        &:nth-child(3){
                            background-color: #2a9c49;
                        }
                    }
                }
            }
        }

    }
</style>