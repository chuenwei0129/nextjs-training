// | Example                          | URL            | params                    |
// | -------------------------------- | -------------- | ------------------------- |
// | `app/dashboard/[team]/route.js`  | `/dashboard/1` | `{ team: '1' }`           |
// | `app/shop/[tag]/[item]/route.js` | `/shop/1/2`    | `{ tag: '1', item: '2' }` |
// | `app/blog/[...slug]/route.js`    | `/blog/1/2`    | `{ slug: ['1', '2'] }`    |

// 目前`context` 只有一个值就是 `params`，它是一个包含当前动态路由参数的对象。举个例子：
export async function GET(request, context) {
  //  访问 /home, pathname 的值为 /home
  // 访问 /home?name=lee, searchParams 的值为 { 'name': 'lee' }
  const { pathname, searchParams } = request.nextUrl

  const { id } = context.params

  if (id === '1') {
    // const res = await fetch('https://data.mongodb-api.com/...', {
    //   next: { revalidate: 60 }, //  每 60 秒重新验证
    // })
    // const data = await res.json()

    return Response.json({
      id,
    })
  }

  // 使用 `Response` 对象的 GET 请求的返回结果默认会被缓存：
  // 也就是说，当下次再访问该 GET 请求时，会直接使用缓存中的结果，而非重新请求数据源。
  return Response.json({
    id,
    pathname,
    searchParams: Object.fromEntries(searchParams),
  })
}

// 但是这些情况下会推出缓存：
// 使用 `Request` 对象的 `GET` 请求
// 比如请求引用了 request.id 之类的：fetch(`https://api/${equest.id}`
// *   使用其他 HTTP 方法，比如 POST：
// *   使用如 cookies、headers 这样的动态函数：
// 使用基于底层 Web API 的抽象来读取 cookie （NextRequest）也会导致退出缓存：

// 注：不仅 `GET` 请求会被缓存，正常使用 `POST` 方法的 `fetch` 请求也会被自动缓存，但在路由处理程序中使用 `POST` 方法的 `fetch` 请求不会被缓存。
// Next.js 拓展了原生的 fetch Web API，增加了缓存（caching）和重新验证（ revalidating）功能。你可以在：

// 1. 服务端组件
// 2. 路由处理程序
// 3. Server Actions

// 注：在一个静态渲染的路由中，如果你有多个请求，每个请求设置了不同的重新验证时间，将会使用最短的时间用于所有的请求。而对于动态渲染的路由，每一个 `fetch`请求都将独立重新验证。
// **Next.js 推荐单独配置每个请求的缓存行为，这可以让你更精细化的控制缓存行为。**

// 如果你需要在客户端组件中获取数据，可以在客户端调用路由处理程序。路由处理程序会在服务端被执行，然后将数据返回给客户端，适用于不想暴露敏感信息给客户端（比如 API tokens）的场景。
// 如果你使用的是服务端组件，无须借助路由处理程序，直接获取数据即可。
