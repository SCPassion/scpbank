import { BrowserRouter, Routes, Route } from "react-router"
import MainLayout from "./layouts/MainLayout"
import { GoogleOAuthProvider } from "@react-oauth/google"

function App() {
  return (
    <GoogleOAuthProvider clientId="797567952659-8la5ljp472iraug6ima4rp5205ml87f1.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<h1>Dashboard</h1>} />
            <Route path="savings" element={<h1>Savings</h1>} />
            <Route
              path="interest"
              element={<h1>Compound Interest Calculator</h1>}
            />
            <Route path="budget" element={<h1>Budget Planner</h1>} />
            <Route path="retire" element={<h1>Retirement Saving Planner</h1>} />
            <Route path="stock" element={<h1>Stock Market Watchlist</h1>} />
            <Route path="investment" element={<h1>Invest Risk Simulator</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
