import hxRequest from '..'
import { IAccount, IDataType, ILoginResult } from './types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', //用法：/user/id
  UserMenu = '/role/'
}

// 函数返回值后期可再写，可不写让其自行推导
export function accountLoginRequest(loginInfo: IAccount) {
  // 后端验证信息
  return hxRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: loginInfo,
    showLoading: false
  })
}

export function requestUserInfoById(id: number) {
  return hxRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenuByRoleId(id: number) {
  return hxRequest.get<IDataType>({
    url: LoginAPI.UserMenu + id + '/menu',
    showLoading: false
  })
}
