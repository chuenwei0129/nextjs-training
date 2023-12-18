<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'Vue2MyForm',

  props: {
    model: {
      type: Object,
    },
    rules: {
      type: Object,
    },
  },

  provide() {
    return {
      formComp: this,
    }
  },

  data() {
    return {
      formItems: [],
    }
  },

  methods: {
    addFormItem(formItem) {
      this.formItems.push(formItem)
    },
    removeFormItem(formItem) {
      if (formItem.prop) {
        this.formItems.splice(this.formItems.indexOf(formItem), 1)
      }
    },

    resetFields() {
      this.fields.forEach((field) => {
        field.resetField()
      })
    },

    // 公开方法：全部校验数据，支持 Promise
    validate(callback) {
      return new Promise((resolve) => {
        let valid = true
        let count = 0
        this.fields.forEach((field) => {
          field.validate('', (errors) => {
            if (errors) {
              valid = false
            }
            if (++count === this.fields.length) {
              // 全部完成
              resolve(valid)
              if (typeof callback === 'function') {
                callback(valid)
              }
            }
          })
        })
      })
    },
  },
}
</script>

<style scoped></style>
