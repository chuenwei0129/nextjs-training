export default function Home() {
  // 现在我们就可以服务端组件或者路由处理程序中通过 `process.env`获取到该值：
  return <h1 className={'font-ma'}>{process.env.NAME}</h1>
}
