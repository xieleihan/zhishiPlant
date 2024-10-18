<template>
    <div class="addHomeinfo">
        <div class="topbox">
            <div class="topboxitem">图片栏</div>
            <div class="topboxitem">标题</div>
            <div class="topboxitem">内容</div>
            <div class="topboxitem">类型</div>
            <div class="topboxitem">用户名</div>
            <div class="topboxitem">点赞数</div>
            <div class="topboxitem">操作</div>
        </div>
        <div class="bottom">
            <!-- 下面的是模版 -->
            <!-- <div class="item">
                <div class="imgBox">
                    <div class="container">
                        <img src="../../assets/images/1.jpg" alt="">
                        <img src="../../assets/images/2.jpg" alt="">
                        <img src="../../assets/images/3.jpg" alt="">
                        <img src="../../assets/images/4.jpg" alt="">
                        <img src="../../assets/images/5.jpg" alt="">
                        <img src="../../assets/images/6.jpg" alt="">
                    </div>
                </div>
                <div class="noimg titlebox">这是标题</div>
                <div class="noimg containerBox">这是文章内容</div>
                <div class="noimg typeinfo">这是类型信息</div>
                <div class="noimg usernameInfo">用户名</div>
                <div class="noimg likenuminfo">700</div>
                <div class="noimg btnbox">
                    <button class="btn">修改</button>
                    <button class="btn">删除</button>
                    <button class="btn">复制</button>
                </div>
            </div> -->
            <div class="item" v-for="(item,index) in arr" :key="index">
                <div class="imgBox">
                    <div class="container">
                        <img :src="item.img" alt="">
                    </div>
                </div>
                <div class="noimg titlebox">{{ item.title }}</div>
                <div class="noimg containerBox">{{ item.info }}</div>
                <div class="noimg typeinfo">{{ item.type }}</div>
                <div class="noimg usernameInfo">{{ item.username }}</div>
                <div class="noimg likenuminfo">{{ item.likenum }}</div>
                <div class="noimg btnbox">
                    <button class="btn">修改</button>
                    <button class="btn">删除</button>
                    <button class="btn">复制</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { onMounted } from 'vue';

const arr = ref<any[]>([]);

onMounted(() => {
    axios.get('https://frp-leg.top:26112/public/homeinfo')
        .then((res) => {
            console.log(res.data.data);
            arr.value = res.data.data;  // 将值赋给 arr.value 而不是 arr
            console.log(arr.value);  // 访问 arr.value 来查看值
        })
        .catch((err) => {
            console.log(err);
        });
});
</script>

<style scoped lang="less">
@import '../../public/publiccss.less';
    .addHomeinfo{
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        position: relative;
        .topbox{
            width: 100%;
            height: 50px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-evenly;
            position: fixed;
            top: 0;
            left: 0%;
            background-color: white;
            z-index: 999;
            border-bottom: 1px solid #ccc;
            .topboxitem{
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                width: calc(100% / 7);
                border-right: 1px solid #ccc;
                &:last-child{
                    border-right: none;
                }
            }
        }
        .bottom{
            width: 100%;
            height: 100%;
            padding-top: 50px;
            .item{
                height: 50px;
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                border-bottom: 1px solid #ccc;
                .noimg {
                    width: calc(100% / 7);
                    height: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    border-right: 1px solid #ccc;
                    &:last-child{
                        border-right: none;
                    }
                    .btn{
                        width: 50px;
                        height: 30px;
                        color: white;
                        margin-right: 2px;
                        &:last-child{
                            margin-right: 0;
                        }
                        &:nth-child(1){
                            background-color: @googleBlue;
                        }
                        &:nth-child(2){
                            background-color: @googleRed;
                        }
                        &:nth-child(3){
                            background-color: @googleGreen;
                        }
                    }
                }
                .imgBox{
                    height: 50px;
                    width: calc(100% / 7);
                    display: flex;
                    flex-direction: row;
                    border-right: 1px solid #ccc;
                    .container{
                        overflow-x: scroll;
                        display: flex;
                        height: 100%;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        align-items: center;
                        padding: 0 5px;
                        img{
                            width: 30px;
                            height: 30px;
                            margin-right: 10px;
                            user-select: none;
                            -webkit-user-drag: none;
                        }
                    }
                }
            }
        }
    }
</style>