<template>
    <div class="account">
        <ul>
            <li>
                <div class="name">用户名</div>
                <div class="name">用户邮箱</div>
                <div class="name">用户密码</div>
                <div class="name">
                    <span>操作区域</span>
                    <button @click="showPopup">新增</button>
                </div>
            </li>
            <!-- 下面的一个是示例 -->
            <li v-for="(item,index) in queryList" :key="index">
                <div class="info">{{ item.username }}</div>
                <div class="info">{{ item.useremail }}</div>
                <div class="info">{{ item.userpassword }}</div>
                <div class="info">
                    <button v-for="(button, idx) in list" :key="idx">{{ button.name }}</button>
                </div>
            </li>
        </ul>
        <van-popup class="pop" v-model:show="show" closeable round :style="{ height:'300px',width:'300px' }">
            <p class="title">新增用户</p>
            <div class="inputBox">
                <input type="email" placeholder="请输入管理员邮箱">
                <div class="verfiry">
                    <input class="inputver" maxlength="4" type="text" placeholder="鉴权验证码">
                    <div class="sendver" @click="openTimeOut">{{ sendverbtn }}</div>
                </div>
                <button>提交</button>
            </div>
        </van-popup>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';
import axios from 'axios';

onMounted(() => {
    const token = sessionStorage.getItem('AUTO_TOKEN')
    axios.post('https://frp-leg.top:26112/super/getUsers',{"token":token}).then((res) => {
        // console.log(res.data)
        queryList.value = res.data.data
        console.log(queryList)
    }).catch(() => {
        console.log('网络出现故障')
    })
})

let queryList = ref<any[]>([]); 

const show = ref(false);
const showPopup = () => {
    show.value = true;
};

const sendverbtn = ref('发送验证码');
// @ts-ignore
let timer; // 定义计时器变量

const openTimeOut = () => {
    // @ts-ignore
    if (timer) {
        clearInterval(timer); // 清除上一个计时器
    }

    let time = 60;
    sendverbtn.value = `${time}s后重新发送`;

    timer = setInterval(() => {
        time--;
        sendverbtn.value = `${time}s后重新发送`;
        if (time === 0) {
            // @ts-ignore
            clearInterval(timer);
            timer = null; // 重置计时器变量
            sendverbtn.value = '发送验证码';
        }
    }, 1000);
};

// 在组件卸载时清除计时器
onUnmounted(() => {
    // @ts-ignore
    if (timer) {
        clearInterval(timer);
    }
});

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
        .pop{
            .title{
                position: absolute;
                top: 18px;
                left: 50%;
                transform: translateX(-50%);
            }
            .inputBox{
                width: 70%;
                height: 70%;
                position: absolute;
                top: 55%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                .verfiry{
                    position: relative;
                    .sendver{
                        position: absolute;
                        right: 0px;
                        top: 0;
                        height: 50px;
                        line-height: 50px;
                        color: white;
                        background-color: @googleBlue;
                        width: 100px;
                        font-size: 12px;
                        text-align: center;
                        
                    }
                }
                input{
                    width: 100%;
                    height: 50px;
                    padding-left: 10px;
                    &.inputver{
                        padding-right: 100px;
                    }
                }
                button{
                    width: 100%;
                    height: 50px;
                    background-color: white;
                    color: @googleBlue;
                    border: 1px solid @googleBlue;
                    &:hover{
                        background-color: @googleBlue;
                        color: white;
                    }
                }
            }
        }
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
                    button{
                        width: calc(100% / 3 - 40px);
                        height: 30px;
                        border-radius: @radius;
                        color: white;
                        background-color: @googleYellow;
                        margin-left: 10px;
                    }
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