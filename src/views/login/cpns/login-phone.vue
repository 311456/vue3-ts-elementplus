<template>
  <div class="login-phone">
    <el-form label-width="70px" :rules="rules" :model="phone" ref="formRef">
      <el-form-item label="手机号" prop="number">
        <el-input v-model="phone.number"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="vertifyCode">
        <div class="get-code">
          <el-input v-model="phone.vertifyCode"></el-input>
          <el-button type="primary" class="code">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'

import { rules } from '../config/login-phone'
import localCache from '../../../utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()
    const phone = reactive({
      number: localCache.getCache('number') ?? '',
      vertifyCode: ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword) {
            localCache.setCache('number', phone.number)
          } else {
            localCache.deleteCache('number')
          }
          store.dispatch('loginModule/phoneLoginAction', { ...phone })
        }
      })
    }
    return {
      phone,
      rules,
      formRef,
      loginAction
    }
  }
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;

  .code {
    margin-left: 10px;
  }
}
</style>
