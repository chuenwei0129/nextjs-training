'use client' // 错误组件必须是客户端组件
import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // 尝试恢复
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}

// 因为 `Layout` 和 `Template` 在 `ErrorBoundary` 外面，这说明错误边界不能捕获同级的 `layout.js` 或者 `template.js` 中的错误。如果你想捕获特定布局或者模板中的错误，那就在父级的 `error.js` 里进行捕获。
// 那问题来了，如果已经到了顶层，就比如根布局中的错误如何捕获呢？为了解决这个问题，Next.js 提供了 `global-error.js`文件，使用它时，将其放在 `app` 目录下。
