<template>
  <div class="login-account">
    <!-- ：model指定对应最新的数据方便进行验证
    ：model = v-bind:model-->
    <el-form label-width="70px" :rules="rules" :model="account" ref="formRef">
      <!-- prop指定验证规则 -->
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'

import { rules } from '../config/login-account'
import localCache from '../../../utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      name: localCache.getCache('Hname') ?? 'admin',
      password: localCache.getCache('Hpassword') ?? '123456'
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache('Hname', account.name)
            localCache.setCache('Hpassword', account.password)
          } else {
            localCache.deleteCache('Hname')
            localCache.deleteCache('Hpassword')
          }
          // 2.登录验证
          store.dispatch('loginModule/accountLoginAction', { ...account })
        }
      })
    }
    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
