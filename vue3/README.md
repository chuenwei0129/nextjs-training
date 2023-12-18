shallowRef 普通类型
ref 对象类型 可以直接修改 value 值
reactive 不可以绑定普通的数据类型
reactive 不可以直接修改值，需要通过修改对象的属性来修改值
readonly 只限制拷贝的对象，不限制原对象
// toRef 如果原始对象是非响应式的就不会更新视图 数据是会变的
// 修改 proxy 对象的值也会修改原始对象的值
计算属性就是当依赖的属性的值发生变化的时候，才会触发他的更改，如果依赖的值，不发生变化的时候，使用的是缓存中的属性值。
使用reactive监听深层对象开启和不开启deep 效果一样

watch第一个参数监听源

watch第二个参数回调函数cb（newVal,oldVal）

watch第三个参数一个options配置项是一个对象

监听reactive 单一值

let message = reactive({
    name:"",
    name2:""
})

watch(()=>message.name, (newVal, oldVal) => {
    console.log('新的值----', newVal);
    console.log('旧的值----', oldVal);
})

watchEffect

立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。
停止跟踪 watchEffect 返回一个函数 调用之后将停止更新

const stop = watchEffect(() => {
    console.log(message.name);
}, {
    flush: 'sync',
    onTrigger () {}
})

stop()

副作用刷新时机 flush 一般使用post
pre	sync	post
组件更新前执行	强制效果始终同步触发	组件更新后执行

onTrigger  可以帮助我们调试 watchEffect

onBeforeMount()

在组件DOM实际渲染安装之前调用。在这一步中，根元素还不存在。

onMounted()

在组件的第一次渲染后调用，该元素现在可用，允许直接DOM访问

onBeforeUpdate()

数据更新时调用，发生在虚拟 DOM 打补丁之前。

onUpdated()

DOM更新后，updated的方法即会调用。

onBeforeUnmount()

在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。

onUnmounted()

卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。

::v-deep

通过defineProps 来接受 defineProps是无须引入的直接使用即可

如果我们使用的TypeScript

可以使用传递字面量类型的纯类型语法做为参数

defineProps<{
    title:string,
    data:number[]
}>()

withDefaults是个函数也是无须引入开箱即用接受一个props函数第二个参数是一个对象设置默认值

type Props = {
    title?: string,
    data?: number[]
}
withDefaults(defineProps<Props>(), {
    title: "张三",
    data: () => [1, 2, 3]
})

<!-- 是通过defineEmits派发一个事件 -->
const emit = defineEmits(['on-click'])
 
//如果用了ts可以这样两种方式
// const emit = defineEmits<{
//     (e: "on-click", name: string): void
// }>()
const clickTap = () => {
    emit('on-click', list)


子组件暴露给父组件内部属性

通过defineExpose

我们从父组件获取子组件实例通过ref

 <Menu ref="refMenu"></Menu>
//这样获取是有代码提示的
<script setup lang="ts">
import MenuCom from '../xxxxxxx.vue'
//注意这儿的typeof里面放的是组件名字(MenuCom)不是ref的名字 ref的名字对应开头的变量名(refMenu)
const refMenu = ref<InstanceType<typeof MenuCom>>()


defineExpose({
    list
})


1.在Vue2 的时候is 是通过组件名称切换的 在Vue3 setup 是通过组件实例切换的

2.如果你把组件实例放到Reactive Vue会给你一个警告runtime-core.esm-bundler.js:38 [Vue warn]: Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`. 
Component that was made reactive: 

这是因为reactive 会进行proxy 代理 而我们组件代理之后毫无用处 节省性能开销 推荐我们使用shallowRef 或者  markRaw 跳过proxy 代理

修改如下

const tab = reactive<Com[]>([{
    name: "A组件",
    comName: markRaw(A)
}, {
    name: "B组件",
    comName: markRaw(B)

Owner avatar
unplugin-auto-import

mixins就是将这些多个相同的逻辑抽离出来，各个组件只需要引入mixins，就能实现一次写代码，多组件受益的效果。

弊端就是 会涉及到覆盖的问题

组件的data、methods、filters会覆盖mixins里的同名data、methods、filters。
第二点就是 变量来源不明确（隐式传入），不利于阅读，使代码变得难以维护。

<!-- setup 只运行一次 -->
<!-- render 多次运行 -->
<!-- vue3 拍平了 props -->
<!-- 复用 props 类型。required + as const -->
