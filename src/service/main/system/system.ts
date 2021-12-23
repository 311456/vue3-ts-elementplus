import hxRequest from '@/service'
import { IDataType } from '@/service/login/types'

export function getPageListData(url: string, queryInfo: any) {
  return hxRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

export function deleteData(url: string) {
  return hxRequest.delete<IDataType>({
    url: url
  })
}

export function createData(url: string, newData: any) {
  return hxRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editData(url: string, editData: any) {
  return hxRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
