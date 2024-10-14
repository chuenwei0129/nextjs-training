// 因为 `Layout` 和 `Template` 在 `ErrorBoundary` 外面，这说明错误边界不能捕获同级的 `layout.js` 或者 `template.js` 中的错误。如果你想捕获特定布局或者模板中的错误，那就在父级的 `error.js` 里进行捕获。
// 那问题来了，如果已经到了顶层，就比如根布局中的错误如何捕获呢？为了解决这个问题，Next.js 提供了 `global-error.js`文件，使用它时，将其放在 `app` 目录下。
// `global-error.js`会包裹整个应用，而且当它触发的时候，它会替换掉根布局的内容。所以，`global-error.js` 中也要定义 `<html>` 和 `<body>` 标签。

// 注：`global-error.js` 用来处理根布局和根模板中的错误，`app/error.js` 建议还是要写的
'use client'
// app/global-error.js
export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
