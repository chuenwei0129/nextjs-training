/* eslint-disable @next/next/no-img-element */
// `/feed/(..)photo`对应的路由是 `/feed/photo`，要拦截的路由是 `/photo`，两者只差了一个层级，所以使用 `(..)`。

import Link from 'next/link'
import { photos } from './data'

export default function Page() {
  return (
    <main>
      {photos.map(({ id, src }) => (
        <Link key={id} href={`intercept/photo/${id}`}>
          <img width="100" src={src} alt={src} />
        </Link>
      ))}
    </main>
  )
}
