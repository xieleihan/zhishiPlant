<template>
    <div class="typebox">
        <div v-for="(item,index) in list" 
            :key="index" 
            @click="setActiveclass(index, item.name)" 
            :class="activeIndex === item.id ? 'item active': 'item' ">
            {{ item.name }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTypeStore } from '../../stores/type'
const typeStore = useTypeStore();

function setActiveclass(index: number, name: string) {
    activeIndex.value = index;
    typeStore.setTypename(name);
}

const activeIndex = ref(0);
const list = ref([
    { name: '首页', id: 0 },
    { name: '关于', id: 1 },
    { name: '服务', id: 2 },
    { name: '案例', id: 3 },
    { name: '新闻', id: 4 },
    { name: '联系', id: 5 }
])
</script>

<style scoped lang="less">
@import '../../public/publiccss.less';
    .typebox{
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 10px 0;
        .item{
            width: 80px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: @themeColor;
            cursor: pointer;
            background-color: white;
            border-radius: @radius;
            border: 1px solid @themeColor;
            margin-right: 10px;
            &:last-child{
                margin-right: 0;
            }
            &.active{
                background-color: @themeColor;
                color: white;
                border: none;
            }
        }
    }
</style>