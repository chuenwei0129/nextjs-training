'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const Page = () => {
  const pathname = usePathname()
  console.log('🚀 ~ Page ~ pathname:', pathname)

  // 注意使用该 hook 需要在客户端组件中。（顶层的 `'use client'` 就是声明这是客户端组件）
  // const router = useRouter()
  // router.push('/dashboard') // Navigate to /dashboard

  // App Router 的默认行为是滚动到新路由的顶部，或者在前进后退导航时维持之前的滚动距离。
  // 如果你想要禁用这个行为，你可以给 `<Link>` 组件传递一个 `scroll={false}`，或者在使用 `router.push`和 `router.replace`的时候，设置 `scroll: false`。
  return (
    <div>
      {/* 支持 hash */}
      <Link href="/react#edit">Home</Link>
      {/* 支持 动态 */}
      {/* <Link href={`/blog/${post.slug}`}>{post.title}</Link> */}
    </div>
  )
}

export default Page
