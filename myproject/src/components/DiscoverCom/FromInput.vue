<template>
    <div class="fromcom">
        <input type="text" class="title" placeholder="请输入标题" />
        <textarea name="" id="" placeholder="请输入文章信息"></textarea>
        <span>设置分类:</span>
        <div class="sortBox">

            <div class="item" v-for="(item,index) in list" :key="index">
                <button @click="activeIndex = index" :class="activeIndex === index ? 'active' : ''">
                    {{ item.name }}
                </button>
            </div>
        </div>
        <button class="btn">发布</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ref([
    {
        name: '前端',
        id: 1
    },
    {
        name: '后端',
        id: 2
    },
    {
        name: '数据库',
        id: 3
    },
    {
        name: '运维',
        id: 4
    },
    {
        name: '其他',
        id: 5
    }
]);
const activeIndex = ref(0);
</script>

<style scoped lang="less">
@import "../../public/main.less";
    .fromcom{
        width: 100%;
        height: calc(100% - 200px);
        input{
            width: 100%;
            border: none;
            outline: none;
            height: 50px;
            padding: 0 15px;
            background-color: transparent;
            border-bottom: 1px solid #ccc;
            margin-bottom: 10px;
        }
        textarea{
            width: 100%;
            height: 100px;
            resize: none;
            background-color: transparent;
            border: none;
            outline: none;
            padding: 10px 15px;
            border: 1px solid #ccc;
        }
        span{
            margin-top: 10px;
            display: block;
        }
        .sortBox{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
            margin-top: 10px;
            button{
                width: 55px;
                height: 30px;
                margin-right: 8px;
                color: @returnBtnBgColor;
                background-color: white;
                border: 1px solid @returnBtnBgColor;
                &.active{
                    background-color: @returnBtnBgColor;
                    color: white;
                }
            }
        }
        .btn{
            width: 100%;
            height: 50px;
            margin-top: 20px;
            background-color: white;
            border: 1px solid @returnBtnBgColor;
            color: @returnBtnBgColor;
        }
    }
</style>