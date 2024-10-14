// app/shop/[...slug]/page.js // shop需要自己写page，无 /shop
// app/shop/[[...slug]]/page.js 多补货了一层 shop，如果 shop 有 page，则无效。
export default function Page({ params }) {
  return <div>My Shop: {JSON.stringify(params)}</div>
}
