import { ref } from 'vue'
import { pageModal } from '@/components/page-modal'

type callbackFn = (item?: any) => void

export function usePageModal(newCb?: callbackFn, editCb?: callbackFn) {
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  const defaultInfo = ref({})
  // 对发射出的事件进行对应的处理
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    // 对应页面的相关操作（对应页面传递过来的函数）
    newCb && newCb()
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    editCb && editCb(item)
  }
  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}
