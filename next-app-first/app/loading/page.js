async function mockFetch() {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return {
    message: 'Hello, Dashboard!',
  }
}

// 只能再服务端组件使用
// const Page = async function Page() {
//   const { message } = await mockFetch()
//   return <div>{message}</div>
// }
// export default Page

// 当然实现 loading 效果，不一定非导出一个 async 函数。也可以借助 React 的 `use` 函数。
import { use } from 'react'

const Page = function Page() {
  const { message } = use(mockFetch())
  return <div>{message}</div>
}
export default Page

// 层级
// 1. layout
// 2. Template
// 3. error
// 4. loading
// 5. not-found
// 6. page
