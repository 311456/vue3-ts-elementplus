<template>
  <div class="nav-header">
    <i
      class="el-fold"
      :class="isFold ? ' el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="changeFold"
    ></i>
    <div class="content">
      <hx-breadcrumb :breadcrumbs="breadcrumbs"></hx-breadcrumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import { useStore } from '@/store'
import { pathMapToBreadcrumb } from '@/utils/map-menu'

import UserInfo from './user-info.vue'
import HxBreadcrumb from '@/base-ui/breadcrumb'

export default defineComponent({
  emits: ['changeFold'],
  components: {
    UserInfo,
    HxBreadcrumb
  },
  setup(props, { emit }) {
    const isFold = ref(false)
    const changeFold = () => {
      isFold.value = !isFold.value
      emit('changeFold', isFold.value)
    }

    // 该方法显示面包屑有问题，需要手动刷新才能再次改变面包屑的内容
    // const route = useRoute()
    // console.log(route.path) 如： /main/analysis/overview
    // splice函数会修改原数组，返回值是被删除元素的数组
    // const paths: string[] = route.path.split('/').splice(2, 2)
    // console.log(paths)

    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenu = store.state.loginModule.userMenu
      const route = useRoute()
      const currentPath = route.path
      return pathMapToBreadcrumb(userMenu, currentPath)
    })

    return {
      isFold,
      changeFold,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  width: 100%;

  .el-fold {
    font-size: 28px;
    cursor: pointer;
  }

  .content {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    margin: auto 20px;
  }
}
</style>
