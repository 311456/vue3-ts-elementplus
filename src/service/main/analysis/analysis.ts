import hxRequest from '@/service'
import { IDataType } from '@/service/login/types'

enum analysisApi {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale',
  amountGoodsList = '/goods/amount/list'
}

export function getCategoryGoodsCount() {
  return hxRequest.get<IDataType>({
    url: analysisApi.categoryGoodsCount
  })
}
export function getCategoryGoodsSale() {
  return hxRequest.get<IDataType>({
    url: analysisApi.categoryGoodsSale
  })
}

export function getCategoryGoodsFavor() {
  return hxRequest.get<IDataType>({
    url: analysisApi.categoryGoodsFavor
  })
}
export function getAddressGoodsSale() {
  return hxRequest.get<IDataType>({
    url: analysisApi.addressGoodsSale
  })
}
export function getAmountGoodsList() {
  return hxRequest.get<IDataType>({
    url: analysisApi.amountGoodsList
  })
}
