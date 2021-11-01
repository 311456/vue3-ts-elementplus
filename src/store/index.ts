import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { IRootState, IStoreType } from './types'
import loginModule from './login/login'
import systemModule from './main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'harr',
      age: 44
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    loginModule,
    systemModule
  }
})

export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin')
}

// 返回值是Store<IStoreType>类型
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
