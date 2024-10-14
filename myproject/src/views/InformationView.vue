<template>
    <div class="informations">
        <div class="title">
            上传
            <div class="images">
                <img src="../assets/icon/宇宙星球-2.png" alt="">
                <span>与我相关</span>
            </div>
        </div>
        <div class="container">
            <MouduleItem />
            <p class="plist">消息列表</p>
            <SmsList />
        </div>
    </div>
</template>

<script setup lang="ts">
import MouduleItem from '@/components/InformationCom/MouduleItem.vue';
import SmsList from '@/components/InformationCom/SmsList.vue';

</script>

<style scoped lang="less">
@import "../public/main.less";
    .informations{
        width: 100%;
        height: 100%;
        background-color: @bgColor;
        position: relative;
        .title {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            position: fixed;
            top: 0;
            left: 0;
            font-size: 20px;
    
            .images {
                width: 100px;
                border: 1px solid @returnBtnBgColor;
                border-radius: @radius;
                height: 30px;
                position: absolute;
                display: flex;
                flex-direction: row;
                align-items: center;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                img{
                    width: 30px;
                    height: 30px;
                }
            }
        }
        .container{
            width: 100%;
            padding: 0 20px;
            height: 100%;
            padding-top: 50px;
            .plist{
                width: 100%;
                height: 50px;
                display: flex;
                align-items: center;
                font-size: 20px;
            }
        }
    }
</style>
