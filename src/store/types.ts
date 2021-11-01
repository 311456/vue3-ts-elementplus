import { ILoginState } from '@/store/login/types'
import { ISystemState } from './main/system/types'

export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModule {
  // login模块
  loginModule: ILoginState
  // system模块
  systemModule: ISystemState
}

export type IStoreType = IRootState & IRootWithModule
