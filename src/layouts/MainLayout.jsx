import { Outlet } from "react-router"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { useState, useEffect, createContext } from "react"

const UserContext = createContext()

export default function MainLayout() {
  const [user, setUser] = useState(null)
  console.log(user, setUser)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="bg-backgroundColor grid h-screen md:grid-cols-15 md:grid-rows-8">
        <Header className="md:col-start-4 md:-col-end-1 md:px-8 md:py-5" />
        <Sidebar className="bg-sidebarColor text-white md:col-start-1 md:col-end-4 md:row-start-1 md:-row-end-1 md:px-7 md:py-12" />
        <Outlet />
      </div>
    </UserContext.Provider>
  )
}

export { UserContext }
