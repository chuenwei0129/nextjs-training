<template>
  <input type="text" :value="currentValue" v-on="inputListeners" v-bind="$attrs" />
</template>

<script>
export default {
  name: 'Vue2MyInput',
  inheritAttrs: false,
  inject: ['formItemComp'],

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      currentValue: this.value,
    }
  },

  // 必须监听 value 的变化，否则外部修改 value 时，组件不会更新
  watch: {
    value(newVal) {
      this.currentValue = newVal
    },
  },

  computed: {
    inputListeners() {
      return {
        ...this.$listeners,
        input: (e) => {
          this.currentValue = e.target.value
          this.$emit('input', this.currentValue)
          // this.formItemComp.$emit('on-form-change', this.currentValue)
          // 往上冒泡，通知 FormItem 组件，当前表单组件的值发生了变化
          this.formItemComp.onChange()
        },
        blur: () => {
          // this.formItemComp.$emit('on-form-blur', this.currentValue)
          this.formItemComp.onBlur()
        },
      }
    },
  },
}
</script>

<style scoped></style>
