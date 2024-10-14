// 但当访问 `/dashboard/blog/[id]`时，因为没有对应的路由处理程序，依然是默认的 not-found 效果
// 如果我们添加对应的处理程序，在 `app/dashboard/blog/[id]/page.js`中也执行 notFound 函数，就会渲染 `/dashboard/blog/not-found.js`的 UI 内容。

// import { notFound } from 'next/navigation'
'use client'
// 主动抛出 404
export default function Profile({ params }) {
  console.log('🚀 ~ Profile ~ params:', params)
  return <div>Profile</div>
  // notFound()
}
