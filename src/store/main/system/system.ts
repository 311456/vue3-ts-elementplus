import { Module } from 'vuex'
import { IRootState } from '../../types'
import { ISystemState } from './types'
import {
  getPageListData,
  deleteData,
  createData,
  editData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      departmentList: [],
      departmentCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changeUsersList(state, usersList: any) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },
    changeDepartmentList(state, departmentList: any) {
      state.departmentList = departmentList
    },
    changeDepartmentCount(state, departmentCount: number) {
      state.departmentCount = departmentCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.对页面发射请求
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      // 以下方法适用于api命名不统一
      // switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      // }
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      // console.log(pageResult)

      // 2.将数据存储到state中
      const { list, totalCount } = pageResult.data
      // console.log(list, totalCount)
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },
    async deleteDataAction(context, payload: any) {
      // 删除的路由的格式：pageName/id
      // 1.获取需要的参数
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      // 2.发送删除的网络请求
      await deleteData(pageUrl)
      //3. 重新请求最新的数据进行展示
      context.dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async createPageDataAction({ dispatch }, payload: any) {
      // 1."创建"数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      const { data: result } = await createData(pageUrl, newData)

      // 2.重新请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
      return result
    },
    async editPageDataAction({ dispatch }, payload: any) {
      // 1."编辑"数据的请求
      const { pageName, editDatas, id } = payload
      const pageUrl = `/${pageName}/${id}`
      const { data: result } = await editData(pageUrl, editDatas)

      // 2.重新请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
      return result
    }
  }
}

export default systemModule
