import React, { useState, useEffect } from "react"
import { BrowserRouter } from "react-router-dom"
import Router from "./Router"
import UserContext from "./context/UserContext"
import "./style/App.css"

function App() {
  const [user, setUser] = useState({})

  return (
    <BrowserRouter>
      <UserContext.Provider value={[user, setUser]}>
        <div className="App">
          <Router />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
