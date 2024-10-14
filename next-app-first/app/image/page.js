'use client'
import local from './local.png'
import Image from 'next/image'

// 由于 `loader` prop 传入的是一个函数，所以需要使用客户端组件，在这个例子中，顶部也是用的 `'use client'`。
const imageLoader = ({ src }) => {
  return `${src}`
}

const Page = () => {
  return (
    <div>
      {/* 使用静态文件导入的方式，`width` 和 `height` 不需要传入，Next.js 会自动提供。 */}
      <Image src={local} alt={'local'}></Image>
      {/* 由于 Next.js 在构建的时候无法获取远程文件，你需要手动提供 `width`、`height` 和可选的 `blurDataURL` props。 */}
      {/* 使用远程地址的时候，Next.js 要求在 `next.config.js`文件中定义支持的远程图片地址，这是为了防止一些恶意使用。 */}
      <Image
        src={`https://picsum.photos/200/200`}
        alt={'remote'}
        width={500}
        height={500}
      ></Image>
      {/* `loader` 表示解析图片地址的自定义函数。 */}
      <Image
        imageLoader={imageLoader}
        src={`https://picsum.photos/300/300`}
        alt={'remote2'}
        width={500}
        height={500}
      ></Image>
      {/* Next.js 要求必须有 width 和 height 属性，哪怕使用静态导入图片的方式，也只是不用自己手写这两个属性而已，Next.js 依然会为你自动添加 width 和 height，之所以这样做，就是为了防止发生布局偏移。 */}
      {/* 1. 自动静态导入 */}
      {/* 2. 显示声明 `width` 和 `height` 属性 */}
      {/* 3. 隐式声明，通过使用 fill 让图片填充父元素 */}
      <div style={{ position: 'relative', width: '500px', height: '500px' }}>
        <Image
          src={`https://picsum.photos/500/500`}
          alt="Picture of the author"
          sizes="500px"
          fill
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  )
}
export default Page
