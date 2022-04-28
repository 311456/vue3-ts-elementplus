<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user"></i> 账号登录</span>
        </template>
        <!-- <LoginAccount></LoginAccount> -->
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <!-- <el-icon><cellphone ></cellphone></el-icon>手机登录 -->
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import { Cellphone } from '@element-plus/icons'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    // Cellphone
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(true)
    // accountRef：与组件进行数据传递。此时loginAccount中返回的数据可以在本组件内调用
    // typeof LoginAccount:获取LoginAccount组件的类型
    // InstanceType<..>：构造一个 拥有构造函数的组件实例 的类型
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref('account')

    const handleLoginClick = () => {
      // 账号登录逻辑
      if (currentTab.value === 'account') {
        // console.log('click accoutn loginBtn', isKeepPassword.value)
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        // 手机登录逻辑
        // console.log('click phone loginBtn', isKeepPassword.value)
        phoneRef.value?.loginAction(isKeepPassword.value)
      }
    }
    return {
      isKeepPassword,
      handleLoginClick,
      accountRef,
      phoneRef,
      currentTab
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 340px;
  margin-bottom: 120px;

  .title {
    text-align: center;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
