import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Store } from './Store'

export default function Navbar() {
  const scroll = () => {
    window.scrollTo(0, window.innerHeight + 200)
  }
  const navigate = useNavigate()

  //   console.log(userInfo)
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { userInfo } = state
  const logout = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
  }

  return (
    <div>
      <nav className="head d-flex justify-content-between  align-items-center">
        <h1>CoinTracker</h1>
        <div className="d-flex justify-content-end">
          <Link
            to="/"
            className="btn btn-dark mx-3 text-decoration-none"
            style={{ color: 'orange' }}
          >
            Home
          </Link>
          <button className="btn btn-dark mx-3" onClick={scroll}>
            Create
          </button>
          <Link
            to="/track"
            className="btn btn-dark mx-3 text-decoration-none"
            style={{ color: 'orange' }}
          >
            Track
          </Link>
          {userInfo ? (
            <>
              <button className="btn btn-dark mx-3" onClick={logout}>
                LogOut
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-dark mx-3 text-decoration-none"
                style={{ color: 'orange' }}
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}
