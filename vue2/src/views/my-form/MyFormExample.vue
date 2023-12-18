<template>
  <div>
    <h2>具有数据校验功能的表单组件</h2>

    <MyForm ref="form" :model="form" :rules="rules">
      <MyFormItem label="姓名：" prop="name">
        <MyInput v-model="form.name" />
      </MyFormItem>
      <MyFormItem label="邮箱：" prop="mail">
        <MyInput v-model="form.mail" />
      </MyFormItem>
    </MyForm>

    <div>
      <button @click="handleSubmit">提交</button>
      <button @click="handleReset">重置</button>
    </div>
  </div>
</template>

<script>
import MyInput from './MyInput.vue'
import MyForm from './MyForm.vue'
import MyFormItem from './MyFormItem.vue'

export default {
  name: 'Vue2MyFormExample',

  components: {
    MyInput,
    MyForm,
    MyFormItem,
  },

  data() {
    return {
      form: {
        name: '',
        mail: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur',
          },
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
        ],
      },
    }
  },

  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          window.alert('提交成功')
        } else {
          window.alert('表单校验失败')
        }
      })
    },
    handleReset() {
      this.$refs.form.resetFields()
    },
  },
}
</script>

<style scoped></style>
