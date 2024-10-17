// 导入定义存储模块的函数
import { defineStore } from 'pinia'

export const useTypeStore = defineStore({
    // 模块的id
    id: "type",
    // 定义存储对象
    state: () => ({
        typename : '首页' as string, // 类型名称
    }),

    // 读取值
    getters: {
        // 获取typename的值
        getTypename():string {
            return this.typename;
        }
    },

    actions: {
        // 设置typename为传入的值
        setTypename(value: string) {
            this.typename = value;
        }
    }
    
})