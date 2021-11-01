export interface IAccount {
  name: string
  password: string
}

// 返回的 数据的data的类型定义
export interface ILoginResult {
  id: number
  name: string
  token: string
}

// 返回的数据的类型
export interface IDataType<T = any> {
  code: number
  data: T
}
// export interface Role {
//   id: number
//   name: string
//   intro: string
//   createAt: Date
//   updateAt: Date
// }

// export interface Department {
//   id: number
//   name: string
//   parentId?: any
//   createAt: Date
//   updateAt: Date
//   leader: string
// }

// export interface UserInfo {
//   id: number
//   name: string
//   realname: string
//   cellphone: number
//   enable: number
//   createAt: Date
//   updateAt: Date
//   role: Role
//   department: Department
// }

// export interface RootObject {
//   code: number
//   data: UserInfo
// }
