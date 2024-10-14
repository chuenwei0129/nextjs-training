import { notFound } from 'next/navigation'

export default function Page() {
  notFound()
}

// 当访问 `/dashboard/blog`时，因为 `page.js` 丢出了 `notFound` 函数，所以会触发 `not-found.js` 的执行。
