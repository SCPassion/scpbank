import { UserContext } from "../layouts/MainLayout"
import { useContext } from "react"

export default function Header({ ...rest }) {
  const { user, ref } = useContext(UserContext)
  const today = new Date()

  function focusLogin() {
    if (ref.current) {
      ref.current.classList.add("animate-ping")
      setTimeout(() => {
        ref.current.classList.remove("animate-ping")
      }, 1000)
    }
  }

  return (
    <div {...rest}>
      <h1 onClick={focusLogin} className="cursor-pointer">
        {user ? `Hello ${user.displayName}` : "Login in!"}
      </h1>
      <p className="text-3xl font-normal text-[#9F9F9F]">{`>> ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}</p>
    </div>
  )
}
