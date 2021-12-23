import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { IRootState, IStoreType } from './types'
import loginModule from './login/login'
import systemModule from './main/system/system'
import analysisModule from './main/analysis/analysis'

import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'harr',
      age: 44,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    // 存储数据
    changeEntireDepartment(state, departmentList: any) {
      state.entireDepartment = departmentList
    },
    changeEntireRole(state, roleList: any) {
      state.entireRole = roleList
    },
    changeEntireMenu(state, menuList: any) {
      state.entireMenu = menuList
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求完整数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const menuResult = await getPageListData('/menu/list', {})
      // 2.解析获取的数据
      const { list: departmentList } = departmentResult.data
      const { list: roletList } = roleResult.data
      const { list: menuList } = menuResult.data
      // 3.发射事件，对数据进行处理
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roletList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    loginModule,
    systemModule,
    analysisModule
  }
})

export function setupStore() {
  // 在root根组件的setup里调用
  store.dispatch('loginModule/loadLocalLogin')
  // 因为函数是异步的，所以在退出登录后，再次登录请求数据时，可能还没有拿token，所以在确认拿到token后再调用该请求
  // store.dispatch('getInitialDataAction')
}

// 返回值是Store<IStoreType>类型
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
