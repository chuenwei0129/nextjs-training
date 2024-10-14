const layout = ({ children, first, second }) => {
  return (
    <div>
      slot layout
      {children}
      {first}
      {second}
    </div>
  )
}
export default layout
