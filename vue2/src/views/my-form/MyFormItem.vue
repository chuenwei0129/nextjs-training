<template>
  <div>
    <label v-if="label" :class="{ 'my-form-item-label-required': isRequired }">
      <span>{{ label }}</span>
      <slot></slot>
    </label>
    <div v-if="validateState === 'error'" class="my-form-item-message">{{ validateMessage }}</div>
  </div>
</template>

<script>
import Schema from 'async-validator'

export default {
  name: 'Vue2MyFormItem',
  inject: ['formComp'],
  provide() {
    return {
      formItemComp: this,
    }
  },

  props: {
    label: {
      type: String,
    },
    prop: {
      type: String,
    },
  },

  data() {
    return {
      isRequired: false, // 是否为必填
      validateState: '', // 校验状态
      validateMessage: '', // 校验不通过时的提示信息
    }
  },

  computed: {
    // 从 Form 的 model 中动态得到当前表单组件的数据
    fieldValue() {
      return this.formComp.model[this.prop]
    },
  },

  mounted() {
    // 如果没有传入 prop，则无需校验，也就无需缓存
    if (this.prop) {
      // this.formComp.$emit('on-form-item-add', this)
      this.formComp.addField(this)
      // vue 这点很不好，局部变量都挂在了 this 上，容易与 data 中的数据混淆
      this.initialValue = this.fieldValue
      this.setRules()
    }
  },

  // 组件销毁前，将实例从 Form 的缓存中移除
  beforeDestroy() {
    // this.formComp.$emit('on-form-item-remove', this)
    this.formComp.removeField(this)
  },

  methods: {
    onBlur() {
      this.validate('blur')
    },
    onChange() {
      this.validate('change')
    },

    setRules() {
      let rules = this.getRules()
      if (rules.length) {
        rules.every((rule) => {
          // 如果当前校验规则中有必填项，则标记出来
          this.isRequired = rule.required
        })
      }

      // this.$on('on-form-blur', () => this.validate('blur'))
      // this.$on('on-form-change', () => this.validate('change'))
    },

    // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
    getFilteredRule(trigger) {
      const rules = this.getRules()
      return rules.filter((rule) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
    },

    validate(trigger, callback = () => {}) {
      let rules = this.getFilteredRule(trigger)
      if (!rules || rules.length === 0) {
        return true
      }
      // // 设置状态为校验中
      this.validateState = 'validating'
      // 以下为 async-validator 库的调用方法
      let descriptor = {}
      descriptor[this.prop] = rules
      const validator = new Schema(descriptor)
      let model = {}
      model[this.prop] = this.fieldValue
      validator.validate(model, { firstFields: true }, (errors) => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''
        callback(this.validateMessage)
      })
    },

    // 重置数据
    resetField() {
      this.validateState = ''
      this.validateMessage = ''

      this.formComp.model[this.prop] = this.initialValue
    },

    // 从 Form 的 rules 属性中，获取当前 FormItem 的校验规则
    getRules() {
      let formRules = this.formComp.rules
      formRules = formRules ? formRules[this.prop] : []
      return [].concat(formRules || [])
    },
  },
}
</script>

<style scoped>
.my-form-item-label-required::before {
  content: '*';
  color: red;
}
.my-form-item-message {
  color: red;
}
</style>
