import { UserContext } from "../layouts/MainLayout"
import { useContext } from "react"

export default function Header({ ...rest }) {
  const { user } = useContext(UserContext)
  const today = new Date()
  return (
    <div {...rest}>
      <h1>{user ? `Hello ${user.displayName}` : "Login in!"}</h1>
      <p className="text-3xl font-normal text-[#9F9F9F]">{`>> ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}</p>
    </div>
  )
}
