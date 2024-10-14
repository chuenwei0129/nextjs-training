'use client'
import { useState } from 'react'

const Template = ({ children }) => {
  const [count, setCount] = useState(0)
  return (
    <div>
      react Template {count}
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {children}
    </div>
  )
}

export default Template

// 模板类似于布局，它也会传入每个子布局或者页面。但不会像布局那样维持状态。
// 模板在路由切换时会为每一个 children  创建一个实例。这就意味着当用户在共享一个模板的路由间跳转的时候，将会重新挂载组件实例，重新创建 DOM 元素，不保留状态。
// 保持状态是对于同一文件夹下的路由来讲的，如果是不同文件夹下的路由，需要用 keepalive。

// 如果同一目录下既有 `template.js` 也有 `layout.js`
// 也就是说 `layout` 会包裹 `template`，`template` 又会包裹 `page`。
