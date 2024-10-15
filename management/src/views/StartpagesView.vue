<template>
    <div class="startPages">
        <div class="startBox" v-if="!isOpen">
            <div class="top">
                <img src="../assets/images/peacock_flat.png" alt="">
            </div>
            <div class="bottom">
                <p>知识星球管理后台</p>
                <button @click="setDisplay">点击登录</button>
            </div>
            <div class="copyright">
                <p>Copyright© 2024 知识星球, SouthAki开发所有.</p>
            </div>
        </div>
        <div class="container" v-if="isOpen">
            <div class="inputBox">
                <div class="cores" @click="noShow">
                    <van-icon name="cross" />
                </div>
                <p>登录</p>
                <input type="text" placeholder="请输入管理员账号" v-model="username">
                <input type="password" placeholder="请输入密码" v-model="password">
                <div class="verificationBox">
                    <input type="text" maxlength="4" placeholder="验证码" v-model="verifyCode">
                    <div v-html="imgSrc" @click="toggleImg"></div>
                </div>
                <button @click="vercode">验证</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { onMounted } from 'vue';
import { showToast } from 'vant';
import router from '../router/index';
import { useHomeStore } from '../stores/home'

const homeStore = useHomeStore();

function vercode(){
    // console.log(sessionStorage.getItem('AUTO_TOKEN'))
    if (verifyCode.value === ''){
        showToast('请输入验证码');
        return
    }
    axios.get(`https://frp-leg.top:26112/getVerInfo?code=${verifyCode.value}`).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
            axios.post('https://frp-leg.top:26112/public/adminlogin', { adminusername: username.value, adminuserpassword: password.value, admintoken: sessionStorage.getItem('AUTO_TOKEN') }).then((res) => {
                console.log(res.data)
                showToast('登录成功');
                // 路由跳转
                homeStore.close();
                router.push({ name: 'Management' });
            }).catch((err) => {
                showToast('登录失败');
                console.log(err)
            })
        } else {
            showToast('验证码不正确');
        }
    }).catch(() => {
        showToast('网络出现故障');
    })
    
}

onMounted(() => {
    sessionStorage.setItem('AUTO_TOKEN',"$2b$10$QVsHYcoyzVf/F7Qg/8UQfeguZL.Q7JTIr28n2m13I2FbrAarkEUU6")
})

const imgSrc = ref('');
const isOpen = ref<boolean>(false);
const username = ref('');
const password = ref('');
const verifyCode = ref('');

const setDisplay = () => {
    isOpen.value = true;
    axios.get('https://frp-leg.top:26112/getinfo').then((res) => {
        // console.log(res.data)
        imgSrc.value = res.data
    })
}

const noShow = () => {
    isOpen.value = false;
}

const toggleImg = () => {
    axios.get('https://frp-leg.top:26112/getinfo').then((res) => {
        // console.log(res.data)
        imgSrc.value = res.data
    })
}
</script>

<style scoped lang="less">
@import '../public/publiccss.less';
    .startPages{
        width: 100%;
        height: 100%;
        background: url('../assets/images/800.jpg') no-repeat;
        background-size: cover;
        background-position: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        .startBox{
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: @radius;
            width: 300px;
            height: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .top{
                width: 100px;
                height: 100px;
                margin-bottom: 30px;
                img{
                    width: 100%;
                    height: 100%;
                    aspect-ratio: 1/1;
                }
            }
            .bottom{
                display: flex;
                flex-direction: column;
                p{
                    font-size: 30px;
                    letter-spacing: 3px;
                    margin-bottom: 10px;
                }
                button{
                    width: 100%;
                    height: 40px;
                    border-radius: @radius;
                    background-color: transparent;
                    border: 1px solid @themeColor;
                    color: @themeColor;
                }
            }
            .copyright{
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
                color: #ccc;
            }
        }
        .container{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            backdrop-filter: blur(5px);
            .inputBox{
                background-color: rgba(255, 255, 255, 0.7);
                border-radius: @radius;
                width: 400px;
                height: 400px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
                position: relative;
                .cores{
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    font-size: 30px;
                }

                p{
                    font-size: 30px;
                }
                input{
                    height: 50px;
                    border: none;
                    width: 80%;
                    border: 1px solid #ccc;
                    padding-left: 15px;
                    
                }
                button{
                    width: 80%;
                    height: 50px;
                    border: none;
                    background-color: @themeColor;
                    color: white;
                    border-radius: @radius;
                }
                .verificationBox{
                    width: 80%;
                    display: flex;
                    flex-direction: row;
                    input{
                        border-radius: 0;
                    }
                }
            }
        }
    }
</style>