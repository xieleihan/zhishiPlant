// 导入定义存储模块的函数
import { defineStore } from 'pinia'

export const useAccountStore = defineStore({
    // 模块的id
    id: "account",
    // 定义存储对象
    state: () => ({
        searchString: '', // 搜索框的值
        newString: '', // 新增的值
    }),

    // 读取值
    getters: {
        // 获取searchString的值
        getSearchString():string {
            return this.searchString;
        }
    },
    
    // 设置状态
    actions: {
        // 设置searchString为传入的值
        setSearchString(value: string) {
            this.searchString = value;
            this.newString = value;
        },
        // 输出searchString的值到控制台(用于调试)
        log() {
            console.log(this.searchString);
        }
    }
})