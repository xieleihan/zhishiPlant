<template>
    <div class="account">
        <ul>
            <li>
                <div class="name">用户名</div>
                <div class="name">用户邮箱</div>
                <div class="name">用户密码</div>
                <div class="name">操作区域</div>
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
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
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