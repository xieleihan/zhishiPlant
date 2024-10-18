<template>
    <div class="sendInfo">
        <input type="text" placeholder="请输入信息标题" class="infoTitle">
        <input type="text" placeholder="收件人" class="infoTitle">
        <div class="functionArea">
            <van-icon name="records-o" />
            <van-icon name="brush-o" />
            <van-icon name="edit" />
            <van-icon name="revoke" />
            <van-icon name="link-o" />
            <div class="dropdown">
                <van-popover v-model:show="showPopover" :actions="actions" @select="onSelect">
                    <template #reference>
                        <van-button type="primary">{{ text }}</van-button>
                    </template>
                </van-popover>
            </div>
        </div>
        <textarea name="" id="" placeholder="请输入信息内容"></textarea>
        <button class="sendbtn">发送</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showPopover = ref(false);

const onSelect = (action: { text: string }) => {
    text.value = action.text;
    showPopover.value = false;
};

const text = ref('点击选类别');

// 通过 actions 属性来定义菜单选项
const actions = [
    { text: '广播' },
    { text: '广告' },
    { text: '推流' },
];
</script>


<style scoped lang="less">
@import '../../public/publiccss.less';
    .sendInfo{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px 20px;
        position: relative;
        .infoTitle{
            width: 100%;
            height: 50px;
            border: none;
            border-bottom: 1px solid #ccc;
            margin-bottom: 10px;
        }
        .functionArea{
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            i{
                margin-right: 10px;
                font-size: 20px;
                cursor: pointer;
            }
            .dropdown{
                width: 120px;
                background-color: white;
                position: relative;
                height: 50px;
            }
        }
        textarea{
            width: 100%;
            height: 300px;
            border: 1px solid #ccc;
            border-radius: @radius;
            resize: none;
            padding: 10px;
        }
        .sendbtn{
            width: 80px;
            height: 40px;
            background-color: @themeColor;
            color: white;
            border: none;
            border-radius: @radius;
            position: absolute;
            right: 40px;
            bottom: 30px;
        }
    }
</style>