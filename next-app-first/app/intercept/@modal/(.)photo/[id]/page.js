/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { photos } from '../../../data'

// 此处应该是个 modal
// 离开modal 时该更新路由
export default function PhotoModal({ params: { id } }) {
  const photo = photos.find((p) => p.id === id)
  return (
    <div>
      <Link href="/intercept">{photo.src}</Link>
    </div>
  )
}
