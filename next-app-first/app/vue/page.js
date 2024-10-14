import Link from 'next/link'

const page = () => {
  return (
    <>
      <div>vue page</div>
      <Link href="/react">{'>'} React page</Link>
    </>
  )
}
export default page
