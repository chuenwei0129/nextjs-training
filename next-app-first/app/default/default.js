// `/app/page.js`相当于 `app/@children/page.js`。
// {children} 匹配不到 page.js 就会匹配 default.js
// 删除 page.js 试试

export default function Page() {
  return <h1>Hello, Default!</h1>
}
