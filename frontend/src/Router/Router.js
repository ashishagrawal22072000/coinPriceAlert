import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EditAlert from '../EditAlert'
import Home from '../Home'
import Login from '../Login'
import Navbar from '../Navbar'
import ProtectedRouter from '../ProtectedRouter'
import Register from '../Register'
import Track from '../Track'

export default function Router() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouter>
                <Home />
              </ProtectedRouter>
            }
          />
          <Route
            path="/track"
            element={
              <ProtectedRouter>
                <Track />
              </ProtectedRouter>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRouter>
                <EditAlert />
              </ProtectedRouter>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
