import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Store } from './Store'
import Axios from 'axios'
export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { userInfo } = state
  const navigate = useNavigate()
  const signin = async (e) => {
    e.preventDefault()
    try {
      const data = await Axios.post('/signin', {
        email: form.email,
        password: form.password,
      })
      console.log(data)
      if (data && data.status == 200) {
        ctxDispatch({ type: 'USER_SIGNIN', payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
        navigate('/')
      }
    } catch (err) {
      // toast.error(getError(err))
      console.log(err)
    }
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo])

  return (
    <>
      <div className="container d-flex justify-content-center mt-5">
        <div className="container d-flex justify-content-center mt-5">
          <form className="p-5 for">
            <h3 className="mb-5 heading text-center">Have An Account ??</h3>

            <div className="mb-5">
              <label className="text-light">Email Address</label>
              <input
                type="email"
                className="form-control account"
                // placeholder="Email Address"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="mb-5">
              <label className="text-light">Password</label>
              <input
                type="password"
                className="form-control account"
                // placeholder="Email Address"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div className="mb-5 d-flex flex-column justify-content-center">
              <button className="btn btn-dark sign_btn w-100" onClick={signin}>
                SignIn
              </button>
              <p className="text-center text-light">
                Don't Have an Account ? <Link to="/register">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
