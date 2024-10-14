// 布局是支持嵌套的，`app/dashboard/settings/page.js` 会使用 `app/layout.js` 和 `app/dashboard/layout.js` 两个布局中的内容。
import Link from 'next/link'
const page = () => {
  return (
    <div>
      antd page
      <Link href="/react">{'>'} react page</Link>
    </div>
  )
}
export default page
