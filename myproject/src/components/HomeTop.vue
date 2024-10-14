<template>
    <div class="top">
        <input type="text" placeholder="请输入搜索关键字" />
        <div class="avater"></div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
@import "../public/main.less";

    .top {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        display: flex;
        margin-top: 10px;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;

        input {
            border: 1px solid #ccc;
            width: 80%;
            height: 100%;
            padding: 20px 15px;
            border-radius: @radius;
        }

        .avater {
            width: 40px;
            height: 40px;
            background-color: skyblue;
            border-radius: 50%;
        }
    }
</style>