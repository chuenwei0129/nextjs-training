// 类似于 `page.js` 和 `layout.js`。
// 但是要注意 `page.js`和 `route.js`不能在同一层级同时存在。
// 想想也能理解，`page.js`和 `route.js`本质上都是对路由的响应。`page.js`主要负责渲染 UI，`route.js`主要负责处理请求。如果同时存在，Next.js 就不知道用谁的逻辑了。

// app/api/route.js
// 我们使用了 `next/server` 的 NextResponse 对象用于设置响应内容，但其实这里也不一定非要用 `NextResponse`，直接使用 `Response` 也是可以的。（把 `NextResponse.json({ data })` 改为 `Response.json({ data })` 也可以正常运行）
// `NextResponse` 是 Next.js 基于 `Response` 的封装，它对 TypeScript 更加友好，同时提供了更为方便的用法，比如获取 Cookie 等。
import { NextResponse } from 'next/server'

// export async function GET() {
//   const res = await fetch('https://picsum.photos/id/0/info')
//   const data = await res.json()

//   return NextResponse.json({ data })
// }

export async function GET(request, context) {
  //  访问 /home, pathname 的值为 /home
  // 访问 /home?name=lee, searchParams 的值为 { 'name': 'lee' }
  const { pathname, searchParams } = request.nextUrl

  // json 会忽略map
  return NextResponse.json({
    pathname,
    searchParams: Object.fromEntries(searchParams),
  })
}

// export async function GET(request) {}

// export async function HEAD(request) {}

// export async function POST(request) {}

// export async function PUT(request) {}

// export async function DELETE(request) {}

// export async function PATCH(request) {}

// // 如果 `OPTIONS` 没有定义, Next.js 会自动实现 `OPTIONS`
// export async function OPTIONS(request) {}
// 如果传入了不支持的请求方法，Next.js 会返回 `405 Method Not Allowed`。
