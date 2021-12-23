import { ILoginState } from '@/store/login/types'
import { ISystemState } from './main/system/types'
import { IAnalysisState } from './main/analysis/types'

export interface IRootState {
  name: string
  age: number
  entireDepartment: Array<any>
  entireRole: Array<any>
  entireMenu: Array<any>
}

export interface IRootWithModule {
  // login模块
  loginModule: ILoginState
  // system模块
  systemModule: ISystemState
  // analysis模块
  analysisModule: IAnalysisState
}

export type IStoreType = IRootState & IRootWithModule & IAnalysisState
