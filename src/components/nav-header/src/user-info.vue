<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="medium"
          class="user-avatar"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-document">用户信息</el-dropdown-item>
          <el-dropdown-item icon="el-icon-moon-night"
            >系统管理</el-dropdown-item
          >
          <el-dropdown-item
            divided
            icon="el-icon-error"
            @click="handleExitClick"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'

import { useStore } from '@/store'
import LocalCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()
    // 也可以获取头像的url，不过该数据库里没有设计
    const name = computed(() => store.state.loginModule.userInfo.name)
    const router = useRouter()
    const handleExitClick = () => {
      // 退出登录时删除本地缓存的一些数据
      LocalCache.deleteCache('token')
      LocalCache.deleteCache('userInfo')
      LocalCache.deleteCache('userMenu')
      router.push('/main')
    }
    return {
      name,
      handleExitClick
    }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;

  .user-avatar {
    margin-right: 8px;
  }
}
</style>
