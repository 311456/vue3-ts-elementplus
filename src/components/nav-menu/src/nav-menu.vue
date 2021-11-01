<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">VUE3+TS</span>
    </div>
    <!-- el-menu-item：可点击且没有子菜单
        el-sub-menu：可点击有子菜单

        el-menu-item-group：小标题，不可点
     -->
    <el-menu
      :default-active="defaultValue"
      text-color="#b7bdc3"
      background-color="#0c2135"
      active-text-color="#fff"
      class="el-menu-vertical"
      :collapse="collapse"
    >
      <template v-for="item in userMenu" :key="item.id">
        <!-- item.type等于1时表示可以展开 -->
        <template v-if="item.type === 1">
          <!-- 展示 可展开的菜单 -->
          <el-sub-menu :index="item.id + ''">
            <!-- 使用具名插槽展示 -->
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <!-- 本次项目最多只有2级菜单，所以没有继续判断 -->
            <!-- 遍历二级菜单 -->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="handleMenuItemClick(subItem)"
              >
                <i v-if="subItem.icon" :class="subItem.icon"></i>
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 不可展开的菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import { useStore } from '@/store/index'
import { useRouter, useRoute } from 'vue-router'

import { pathMapToMenu } from '@/utils/map-menu'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const userMenu = computed(() => store.state.loginModule.userMenu)

    const router = useRouter()

    // 处理nav-menu和对应component（通过path匹配出当前的组件的菜单路径）的匹配
    const route = useRoute()
    // 当前路由对象的路径
    const currentPath = route.path
    // console.log(route.path)
    const menu = pathMapToMenu(userMenu.value, currentPath)
    // id是当前页面的唯一标识，所以使用id作为menu的映射，而default-active要求传入一个字符串
    const defaultValue = ref(menu.id + '')

    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? 'not-found'
      })
    }

    return {
      userMenu,
      defaultValue,
      handleMenuItemClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 30px;
    padding: 14px 10px 10px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }
  // 一级标题的样式。因为通过插槽渲染的数据必须要要通过深度选择才可以访问到
  // [@vue/compiler-sfc] ::v-deep usage as a combinator has been deprecated. Use :deep(<inner-selector>) instead.
  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }
  // hover高亮hlkji
  .el-menu-item:hover {
    color: white !important;
    // background-color: #0a60bd !important;
  }
  // 被选中的二级标题的样式
  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
  // 去除自带的竖线
  .el-menu {
    border-right: none;
  }
}

// 表示菜单状态，element plus自带
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  // 减去图标的高度
  height: calc(100%-54px);
}
</style>
