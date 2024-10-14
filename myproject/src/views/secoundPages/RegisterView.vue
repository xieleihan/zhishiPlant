<template>
    <div class="register">
        <StartReturnbtn></StartReturnbtn>
        <div class="container">
            <p class="title">注册</p>
            <p class="title">Register</p>
            <p class="info">准备进入星球内部</p>
            <div class="inputBox">
                <div class="text">用户名:</div>
                <input type="text" placeholder="请输入用户名" />
                <div class="text">邮箱:</div>
                <input type="email" placeholder="请输入邮箱">
                <div class="text">密码:</div>
                <div class="passwordBox">
                    <input type="password" placeholder="请输入密码">
                    <img src="../../assets/icon/隐藏.png" alt="">
                </div>
                <div class="passwordBox">
                    <input class="query" type="password" placeholder="请再次确认密码">
                    <img src="../../assets/icon/隐藏.png" alt="">
                </div>
            </div>
            <div class="potocl">
                <input type="checkbox" />
                <p>我已阅读并同意<span>《用户协议》</span>和<span>《隐私政策》</span></p>
            </div>
            <button>提交</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import StartReturnbtn from '@/components/StartReturnbtn.vue';

</script>

<style scoped lang="less">
@import "../../public/main.less";
.register {
    width: 100%;
    height: 100%;
    position: relative;
    
    .container{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        .title{
            font-size: 30px;
            &:nth-child(2){
                margin-bottom: 10px;
            }
        }
        .info{
            color: #ccc;
            letter-spacing: 5px;
            margin-bottom: 30px;
        }
        .inputBox{
            width: 100%;
            input{
                border: none;
                border: 1px solid #ccc;
                width: 100%;
                padding: 0 15px;
                height: 50px;
                border-radius: @radius;
            }
            .text{
                margin: 10px 0;
            }
            .passwordBox{
                position: relative;
                margin-top: 10px;
                img{
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    height: 30px;
                    transform: translateY(-50%);
                }
            }
        }
        .potocl{
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: 10px;
            justify-content: center;
            flex-wrap: nowrap;
            input{
                margin-right: 5px;
            }
            p{
                text-wrap: nowrap;
                span{
                    &:hover{
                        text-decoration: underline;
                        color: @returnBtnBgColor;
                    }
                }
            }
        }
        button{
            width: 100%;
            height: 50px;
            position: absolute;
            margin-top: 10px;
            border-radius: @radius;
            border: 1px solid @returnBtnBgColor;
            background-color: white;
            color: @returnBtnBgColor;
        }
    }
}
</style>
