<template>
    <div class="error">
        <div class="errorbox">
            <h3>404 Not Found</h3>
            <img src="../assets/images/404.png" alt="">
            <p>你来到无人问津的星空</p>
            <button class="btn">回到首页</button>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
@import '../public/publiccss.less';
    .error{
        width: 100%;
        height: 100%;
        background: url('../assets/images/星空.jpg') no-repeat;
        background-size: cover;
        display: flex;
        // flex-direction: column;
        justify-content: center;
        align-items: center;
        .errorbox{
            width: 500px;
            height: 500px;
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: @radius;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
        }
        .btn{
            width: 100px;
            height: 40px;
            border: 1px solid @themeColor;
            border-radius: @radius;
            background-color: white;
            color: @themeColor;
        }
    }
</style>