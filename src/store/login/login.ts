import { Module } from 'vuex'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId
} from '@/service/login/login'
import { ILoginState } from './types'
import { IRootState } from '../types'
import { IAccount } from '@/service/login/types'
import LocalCache from '../../utils/cache'
import router from '@/router'
import { mapMenuToRoutes } from '@/utils/map-menu'

// module必须传入2个泛型。s:state的类型。R：根的类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenu: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenu(state, userMenu: any) {
      state.userMenu = userMenu
      // 让userMenu映射到routes中 --》将routes添加到router.main.children中
      const routes = mapMenuToRoutes(userMenu)
      // console.log(router)
      // 注册角色对应的所有路由
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // console.log('login module', payload)
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      console.log(loginResult)
      const { id, token } = loginResult.data
      // 存储token（jwt生成的）到vuex
      commit('changeToken', token)
      LocalCache.setCache('token', token)

      // 2.请求用户信息（需要验证token）
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      LocalCache.setCache('userInfo', userInfo)

      // 请求用户菜单（需要验证token）
      const userMenuResult = await requestUserMenuByRoleId(userInfo.role.id)
      const userMenu = userMenuResult.data
      commit('changeUserMenu', userMenu)
      LocalCache.setCache('userMenu', userMenu)

      // 跳到首页
      router.push('/main')
    },
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('phone module', payload)
    // }

    // 用户登录后刷新，重新设置vuex的数据。（vuex数据存储在内存里，刷新会清除）
    loadLocalLogin({ commit }) {
      const token = LocalCache.getCache('token')
      if (token) {
        // 修改state最好使用mutation
        commit('changeToken', token)
      }
      const userInfo = LocalCache.getCache('userInfo')
      if (token) {
        commit('changeUserInfo', userInfo)
      }
      const userMenu = LocalCache.getCache('userMenu')
      if (token) {
        commit('changeUserMenu', userMenu)
      }
    }
  }
}

export default loginModule
