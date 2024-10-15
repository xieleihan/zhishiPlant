<template>
    <div class="topview">
        <div class="title">
            <img src="../assets/images/peacock_flat.png" alt="">
            知识星球管理后台
        </div>
        <div class="rightBox">
            <div class="left">
                <img src="../assets/icon/用户.png" alt="">
                <span>Administer</span><span>,你好</span>
            </div>
            <div class="right">
                <img src="../assets/icon/logout.png" alt="">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
@import '../public/publiccss.less';
    .topview{
        width: 100%;
        height: 80px;
        background-color: @themeColor;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
        .title{
            color: #fff;
            font-size: 30px;
            display: flex;
            align-items: center;
            flex-direction: row;
            img{
                width: 50px;
                height: 50px;
                margin-right: 10px;
            }
        }
        .rightBox{
            display: flex;
            flex-direction: row;
            align-items: center;
            img{
                width: 30px;
                height: 30px;
            }
            .left{
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-right: 20px;
                color: white;
                img{
                    margin-right: 10px;
                    width: 25px;
                    height: 25px;
                }
            }
        }
    }
</style>