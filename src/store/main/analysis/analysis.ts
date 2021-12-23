import { Module } from 'vuex'
import { IAnalysisState } from './types'
import { IRootState } from '@/store/types'

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale,
  getAmountGoodsList
} from '@/service/main/analysis/analysis'

const analysisModule: Module<IAnalysisState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: [],
      amountGoodsList: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list: any) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list: any) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list: any) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list: any) {
      state.addressGoodsSale = list
    },
    changeAmountGoodsList(state, list: any) {
      state.amountGoodsList = list
    }
  },
  actions: {
    async getAnalysisDataAction({ commit }) {
      const categoryCountResult = await getCategoryGoodsCount()
      const categorySaleResult = await getCategoryGoodsSale()
      const categoryFavorResult = await getCategoryGoodsFavor()
      const addressSaleResult = await getAddressGoodsSale()
      const amountListResult = await getAmountGoodsList()
      commit('changeCategoryGoodsCount', categoryCountResult.data)
      commit('changeCategoryGoodsSale', categorySaleResult.data)
      commit('changeCategoryGoodsFavor', categoryFavorResult.data)
      commit('changeAddressGoodsSale', addressSaleResult.data)
      commit('changeAmountGoodsList', amountListResult.data)
    }
  }
}

export default analysisModule
