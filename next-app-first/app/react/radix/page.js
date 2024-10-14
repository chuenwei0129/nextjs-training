import Link from 'next/link'

const page = () => {
  return (
    <div>
      radix page
      <Link href="/react">{'>'} react page</Link>
    </div>
  )
}
export default page
