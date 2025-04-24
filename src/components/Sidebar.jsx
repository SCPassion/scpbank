import { Link } from "react-router"
import { GoogleLogin } from "@react-oauth/google"
import { auth, signInWithCredential, GoogleAuthProvider } from "../../firebase"
import { useContext } from "react"
import { UserContext } from "../layouts/MainLayout"
import Navigations from "./Navigations"

export default function Sidebar({ ...rest }) {
  const { user, setUser, ref } = useContext(UserContext)

  async function handleLogin(credentialResponse) {
    try {
      const idToken = credentialResponse.credential
      const firebaseCredential = GoogleAuthProvider.credential(idToken)
      const userCredential = await signInWithCredential(
        auth,
        firebaseCredential,
      )
      setUser(userCredential.user)
      localStorage.setItem("user", JSON.stringify(userCredential.user))
      console.log("userCredential: ", userCredential)
    } catch (error) {
      console.error("Error signing in with Google: ", error)
    }
  }

  async function handleLogOut() {
    try {
      await auth.signOut()
      setUser(null)
      localStorage.removeItem("user")
      console.log("User logged out")
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

  return (
    <div {...rest}>
      <Link to="/">
        <p className="mb-20 text-center text-4xl font-light">
          <span className="font-black">SCP</span>Bank
        </p>
      </Link>

      <Navigations />

      <div className="mt-20">
        {!user ? (
          <div className="flex scale-110 justify-center" ref={ref}>
            <GoogleLogin
              onSuccess={handleLogin}
              onError={() => console.log("not successful")}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4 text-center text-xl font-bold">
            <p className="font-medium">
              User: <span className="font-bold">{user.displayName}</span>
            </p>
            <button
              onClick={handleLogOut}
              className="cursor-pointer rounded-full bg-green-700 py-4"
            >
              Logout!
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
