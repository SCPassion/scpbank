import { NavLink, Link } from "react-router"
import { GoogleLogin } from "@react-oauth/google"
import { auth, signInWithCredential, GoogleAuthProvider } from "../../firebase"

import { useState, useEffect, useContext } from "react"
import { UserContext } from "../layouts/MainLayout"

export default function Sidebar({ ...rest }) {
  const { user, setUser } = useContext(UserContext)

  const normalClass =
    "rounded-lg text-white py-4 block px-8 text-xl font-medium duration-300 hover:bg-green-700"

  async function handleLogin(credentialResponse) {
    try {
      const idToken = credentialResponse.credential
      const firebaseCredential = GoogleAuthProvider.credential(idToken)
      const userCredential = await signInWithCredential(
        auth,
        firebaseCredential,
      )
      setUser(userCredential.user)
      console.log("userCredential: ", userCredential)
    } catch (error) {
      console.error("Error signing in with Google: ", error)
    }
  }

  async function handleLogOut() {
    try {
      await auth.signOut()
      setUser(null)
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
      <nav>
        <ul className="space-y-10">
          <li>
            <NavLink
              to="savings"
              className={({ isActive }) =>
                isActive ? `bg-selectedTab ${normalClass}` : normalClass
              }
            >
              Savings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="interest"
              className={({ isActive }) =>
                isActive ? `bg-selectedTab ${normalClass}` : normalClass
              }
            >
              Interest Calculator
            </NavLink>
          </li>
          <li>
            <NavLink
              to="budget"
              className={({ isActive }) =>
                isActive ? `bg-selectedTab ${normalClass}` : normalClass
              }
            >
              Budget Planner
            </NavLink>
          </li>
          <li>
            <NavLink
              to="retire"
              className={({ isActive }) =>
                isActive ? `bg-selectedTab ${normalClass}` : normalClass
              }
            >
              Retirement Planner
            </NavLink>
          </li>
          <li>
            <NavLink
              to="stock"
              className={({ isActive }) =>
                isActive ? `bg-selectedTab ${normalClass}` : normalClass
              }
            >
              Stock Market
            </NavLink>
          </li>
          <li>
            <NavLink
              to="investment"
              className={({ isActive }) =>
                isActive ? `bg-selectedTab ${normalClass}` : normalClass
              }
            >
              Investment Risk
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="mt-20">
        {!user ? (
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => console.log("not successful")}
          />
        ) : (
          <div className="flex flex-col gap-4 text-center text-xl font-bold">
            <p className="">{`Hi, ${user.displayName}`}</p>
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
