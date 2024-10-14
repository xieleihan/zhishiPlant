<template>
    <div class="setting first">
        <div class="left">
            <img src="../../assets/icon/存入草稿箱.png" alt="">
            <span>草稿箱</span>
        </div>
        <div class="right">
            <img src="../../assets/icon/向左箭头black.png" alt="">
        </div>
    </div>
    <div class="setting">
        <div class="left">
            <img src="../../assets/icon/删除.png" alt="">
            <span>回收站</span>
        </div>
        <div class="right">
            <img src="../../assets/icon/向左箭头black.png" alt="">
        </div>
    </div>
    <div class="setting">
        <div class="left">
            <img src="../../assets/icon/setting.png" alt="">
            <span>设置</span>
        </div>
        <div class="right">
            <img src="../../assets/icon/向左箭头black.png" alt="">
        </div>
    </div>
    <div class="setting">
        <div class="left">
            <img src="../../assets/icon/邮件.png" alt="">
            <span>帮助与客服</span>
        </div>
        <div class="right">
            <img src="../../assets/icon/向左箭头black.png" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
    .first{
        margin-top: 10px;
    }
    .setting {
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        background-color: white;
        border-bottom: 1px solid #ccc;
        
        .left {
            display: flex;
            flex-direction: row;
            align-items: center;

            img {
                width: 30px;
                height: 30px;
                margin-right: 10px;
            }
        }

        .right {
            transform: rotate(180deg);
            display: flex;
            align-items: center;

            img {
                width: 20px;
                height: 20px;
            }
        }
    }
</style>