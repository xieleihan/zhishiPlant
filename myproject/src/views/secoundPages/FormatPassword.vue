<template>
    <div class="format">
        <PublicReturenbtn @click="goTopView" />
        <div class="container">
            <p class="title">修改密码</p>
            <p class="title">Format Password</p>
            <div class="inputBox">
                <div class="text">邮箱:</div>
                <input type="email" placeholder="请输入邮箱">
                <div class="text">验证码:</div>
                <div class="passwordBox">
                    <input type="text" maxlength="6" placeholder="请输入验证码">
                </div>
            </div>
            <button>修改</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import PublicReturenbtn from '@/components/PublicReturenbtn.vue';
import { useHomeStore } from '../../stores/home'
const homeStore = useHomeStore();

function goTopView() {
    homeStore.loginClose();
}

</script>

<style scoped lang="less">
@import "../../public/main.less";
.format {
    width: 100%;
    height: 100%;
    position: relative;

    .container {
        width: 90%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .title {
            font-size: 30px;

            &:nth-child(2) {
                margin-bottom: 10px;
            }
        }

        .inputBox {
            width: 100%;

            input {
                border: none;
                border: 1px solid #ccc;
                width: 100%;
                padding: 0 15px;
                height: 50px;
                border-radius: @radius;
            }

            .text {
                margin: 10px 0;
            }

            .passwordBox {
                position: relative;
                margin-top: 10px;
            }

        }


        button {
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