'use client'
import Link from 'next/link'

const page = () => {
  return (
    <div>
      {/* 在构建的时候，将所有 `NEXT_PUBLIC_`前缀的值做了替换 */}
      <h1>{process.env.NEXT_PUBLIC_ID}</h1>
      <Link href="/react/antd"> {'>'} react/antd page</Link>
      <Link href="/react/radix"> {'>'} react/radix page</Link>
      <Link href="/vue"> {'>'} vue page</Link>
    </div>
  )
}
export default page
