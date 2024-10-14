<template>
    <div class="nav">
        <router-link to="/home" class="item" @click="tabindex(0)">
            <img :src="index === 0 ? 'src/assets/icon/星球-active.png' : 'src/assets/icon/星球.png'" alt="">
            <p :class="index === 0 ? 'text active' : 'text'">星球</p>
        </router-link>
        <router-link to="/information" class="item" @click="tabindex(1)">
            <img :src="index === 1 ? 'src/assets/icon/信息-active.png' : 'src/assets/icon/信息.png'" alt="">
            <p :class="index === 1 ? 'text active' : 'text'">动态</p>
        </router-link>
        <router-link to="/discover" class="item" @click="tabindex(2)">
            <img :src="index === 2 ? 'src/assets/icon/发现-active.png' : 'src/assets/icon/发现.png'" alt="">
            <p :class="index === 2 ? 'text active' : 'text'">发现</p>
        </router-link>
        <router-link to="/user" class="item" @click="tabindex(3)">
            <img :src="index === 3 ? 'src/assets/icon/我的-active.png' : 'src/assets/icon/我的.png'" alt="">
            <p :class="index === 3 ? 'text active' : 'text'">我的</p>
        </router-link>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

function tabindex(newindex: number){
    index.value = newindex;
}

const index = ref(0);

</script>

<style scoped lang="less">
    .nav{
        width: 100%;
        height: 50px;
        padding-bottom: 20px;
        background-color: white;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: row;
        position: fixed;
        bottom: 0;
        z-index: 996;
        
        
        .item{
            width: 25%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            
            img{
                width: 25px;
                height: 25px;
                margin-bottom: 4px;
                // aspect-ratio: 1/1;
                
            }
            .text{
                color: #b3b3b3;
                transition: all 0.3s;
                
                &.active{
                    color: #7cc6ae;
                }
            }
        }
    }
</style>