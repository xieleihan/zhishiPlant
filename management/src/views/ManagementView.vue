<template>
    <div class="managenment">
        <ManagementTopcom />
        <ManagementContainer />
        <van-floating-bubble icon="chat" @click="openSms" />
        <div class="sms" v-show="isSmsOpen">
            <div class="container">
                <div class="smallTriangle"></div>
                <div class="smstitle">
                    <div class="avater">
                        <img src="../assets/images/kefu.webp" alt="">

                    </div>
                    <p class="kefu">智能客服</p>
                </div>
                <div class="smsContainer">
                    <div class="datebox">17:20</div>
                    <div class="left">
                        <div class="avater">
                            <img src="../assets/images/kefu.webp" alt="">
                            <p class="avaterinfo">你的小助手</p>
                        </div>
                        <div class="container">
                            你好,请问有什么可以帮助您的吗？
                        </div>
                    </div>
                    <div class="right">
                        <div class="avater">
                            <img src="../assets/images/peacock_flat.png" alt="">
                            <p class="avaterinfo">Administer</p>
                        </div>
                        <div class="container">
                            你好,请问有什么可以帮助您的吗？
                        </div>
                    </div>
                </div>
                <div class="smsInput">
                    <input type="text" placeholder="请输入咨询信息">
                    <div class="smssend">
                        <van-icon name="guide-o" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import ManagementTopcom from '@/components/ManagementTopcom.vue';
import ManagementContainer from '@/components/ManagementContainer.vue';

function openSms() {
    isSmsOpen.value = !isSmsOpen.value;
}

const isSmsOpen = ref(false);
</script>

<style scoped lang="less">
@import '../public/publiccss.less';

    .managenment{
        width: 100%;
        height: 100%;
        position: relative;
        .sms{
            width: 200px;
            height: 300px;
            position: absolute;
            bottom: 80px;
            right: 10px;
            background-color: white;
            border: 1px solid #ccc;
            border-radius: @radius;
            .container{
                width: 100%;
                height: 100%;
                position: relative;
                // overflow: hidden;
                border-radius: @radius;
                .smstitle{
                    width: 100%;
                    height: 50px;
                    background-color: @themeColor;
                    border-radius: @radius @radius 0 0;
                    position: relative;
                    border-bottom: 1px solid #ccc;
                    .avater{
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        position: absolute;
                        top: 50%;
                        left: 20px;
                        transform: translateY(-50%);
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                    .kefu{
                        color: white;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                }
                .smallTriangle{
                    width: 0;
                    height: 0;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-top: 10px solid #ccc;
                    position: absolute;
                    bottom: -11px;
                    left: 80%;
                    z-index: infinite;
                    transform: translateX(-50%);
                }
                .smsContainer{
                    width: 100%;
                    height: calc(100% - 100px);
                    overflow-y: scroll;
                    
                    .datebox{
                        width: 50px;
                        height: 20px;
                        color: #b3b3b3;
                        text-align: center;
                        margin: 10px auto;
                        line-height: 20px;
                        background-color: #ccc;
                    }

                    .left{
                        width: 80%;
                        margin-left: 5px;
                        height: 90px;
                        position: relative;
                        margin-bottom: 10px;
                        // background-color: skyblue;
                        .avater{
                            width: 100%;
                            height: 30px;
                            display: flex;
                            align-items: center;
                            text-wrap: nowrap;
                            color: #ccc;
                            img{
                                margin-right: 5px;
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                            }
                        }
                        .container{
                            position: absolute;
                            right: 0;
                            top: 30px;
                            width: calc(100% - 30px);
                            height: 60px;
                            background-color: @googleBlue;
                            color: white;
                            padding: 10px;
                            overflow-y: scroll;
                            font-size: 14px;
                            border-radius: 0 @radius @radius @radius;
                        }
                    }
                    .right{
                        width: 80%;
                        margin-left: 35px;
                        height: 90px;
                        position: relative;
                        margin-bottom: 10px;
                        
                        // background-color: skyblue;
                        .avater {
                            width: 100%;
                            height: 30px;
                            display: flex;
                            align-items: center;
                            text-wrap: nowrap;
                            color: #ccc;
                            flex-direction: row-reverse;
                            img {
                                margin-right: 5px;
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                            }
                        }
                    
                        .container {
                            position: absolute;
                            right: 35px;
                            top: 30px;
                            width: calc(100% - 30px);
                            height: 60px;
                            background-color: @googleBlue;
                            color: white;
                            padding: 10px;
                            overflow-y: scroll;
                            font-size: 14px;
                            border-radius: @radius 0 @radius @radius;
                        }
                    }
                }
                .smsInput{
                    width: 100%;
                    height: 50px;
                    position: relative;
                    border-top: 1px solid #ccc;
                    input{
                        width: calc(100% - 42px);
                        height: 100%;
                        border: none;
                        padding-left: 6px;
                        border-radius: 0 0 @radius @radius;
                    }
                    .smssend{
                        position: absolute;
                        right: 10px;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        background-color: @themeColor;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        i{
                            color: white;
                        }
                    }
                }
            }
        }
    }
</style>