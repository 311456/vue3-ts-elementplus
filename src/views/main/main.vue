<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '64px' : '210px'">
        <nav-menu :collapse="isCollapse"></nav-menu>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @changeFold="handleChangeFold"></nav-header>
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { NavMenu } from '@/components/nav-menu'
import { NavHeader } from '@/components/nav-header'

export default defineComponent({
  name: 'hello',
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    const isCollapse = ref(false)
    const handleChangeFold = (isFold: boolean) => {
      isCollapse.value = isFold
    }

    return {
      isCollapse,
      handleChangeFold
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main-content,
.page {
  height: 100%;
}
.page-content {
  height: calc(100%-54px);

  .page-info {
    background-color: aliceblue;
    border-radius: 5px;
  }
}
.el-header {
  display: flex;
  height: 54px !important;
  color: #333;
  text-align: center;
  align-items: center;
  background-color: aliceblue;
}
.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: rgba(19, 16, 16, 0.863);
  transition: width 0.3s linear;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
.el-main {
  color: #333;
  text-align: center;
  background-color: rgb(199, 202, 219);
}
</style>
