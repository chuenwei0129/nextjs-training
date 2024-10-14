// 同一文件夹下如果有 layout.js 和 page.js，page 会作为 children 参数传入 layout。换句话说，layout 会包裹同层级的 page。
'use client'
import { useState } from 'react'
const Layout = ({ children }) => {
  const [count, setCount] = useState(0)
  return (
    <div>
      react Layout {count}
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {children}
    </div>
  )
}

export default Layout
