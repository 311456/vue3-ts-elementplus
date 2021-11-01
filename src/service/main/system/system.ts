import hxRequest from '@/service'
import { IDataType } from '@/service/login/types'

export function getPageListData(url: string, queryInfo: any) {
  return hxRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
