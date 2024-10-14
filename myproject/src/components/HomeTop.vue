<template>
    <div class="top">
        <div class="container">
            <input type="text" placeholder="请输入搜索关键字" />
            <div class="avater">
                <van-icon name="user-o" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
@import "../public/main.less";

.top {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;

    .container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        input {
            border: 1px solid #ccc;
            width: 80%;
            height: 80%;
            padding: 20px 15px;
            border-radius: @radius;
        }

        .avater {
            width: 40px;
            height: 40px;
            border: 1px solid #ccc;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>