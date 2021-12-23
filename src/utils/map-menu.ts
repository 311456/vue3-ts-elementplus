import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

export function mapMenuToRoutes(userMenu: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.先加载出默认的所有的路由
  const allRoutes: RouteRecordRaw[] = []
  // 加载所有的文件。参数true:深度查找
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    // key：所有的路由信息
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // console.log(allRoutes)

  const _recruseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        // 保存第一个可以打开的二级菜单，将第一次/main的路由重定向到菜单里
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recruseGetRoute(menu.children)
      }
    }
  }
  _recruseGetRoute(userMenu)
  // 2.然后根据userMenu动态添加对应的路由

  return routes
}

export function pathMapToBreadcrumb(userMenu: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  // 调用该函数，将数据push到数组中
  pathMapToMenu(userMenu, currentPath, breadcrumbs)
  // 返回该数组
  return breadcrumbs
}

export function pathMapToMenu(
  userMenu: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenu) {
    if (menu.type === 1) {
      // 此时执行else if分支
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        // 将第一级和第二级的路由name、path 都push到breadcrumb数组中
        // 但此次项目最大层级只有2，所以面包屑可以不设置跳转路径
        // breadcrumbs?.push({ name: menu.name, path: menu.url })
        // breadcrumbs?.push({ name: findMenu.name, path: findMenu.url })
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// 映射按钮权限
export function mapMenuToPermissions(userMenu: any[]) {
  const permissions: string[] = []

  const _recruseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      // 如果菜单类型为一级或者二级，则继续遍历（本次按钮权限放在3级的）
      if (menu.type === 1 || menu.type === 2) {
        _recruseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recruseGetPermission(userMenu)

  return permissions
}

// 找出权限树的所有叶子节点
export function getMenuLeafKeys(menuList: any[]) {
  const leafKeys: number[] = []

  const _recruseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recruseGetLeaf(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }
  _recruseGetLeaf(menuList)
  return leafKeys
}

export { firstMenu }
