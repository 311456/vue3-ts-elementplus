import { useStore } from '@/store'

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.loginModule.permissions
  const vertifyPermission = `system:${pageName}:${handleName}`

  return !!permissions.find((item) => item === vertifyPermission)
}
