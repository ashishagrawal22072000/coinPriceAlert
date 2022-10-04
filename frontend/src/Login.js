import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Store } from './Store'
import { toast } from 'react-toastify'
import Axios from 'axios'
export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [spinner, setSpinner] = useState(false)

  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { userInfo } = state
  const navigate = useNavigate()
  const forgetPassword = async (e) => {
    e.preventDefault()
    try {
      setSpinner(true)
      const { data } = await Axios.post('/signin', {
        email: form.email,
        password: form.password,
      })
      console.log(data)
      setSpinner(false)
      if (data) {
        ctxDispatch({ type: 'USER_SIGNIN', payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
        navigate('/')
      }
    } catch (err) {
      setSpinner(false)

      toast.error(err.response.data.message)
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
              <div className="d-flex justify-content-end">
                <Link
                  to="/reset_password"
                  className="text-light mt-2 text-decoration-none fw-bold"
                >
                  Forget Password?
                </Link>
              </div>
            </div>
            <div className="mb-5 d-flex flex-column justify-content-center">
              <button
                className="btn btn-dark sign_btn w-100"
                onClick={forgetPassword}
              >
                SignIn
                {spinner ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </>
                ) : (
                  <></>
                )}
              </button>
              <p className="text-center text-light">
                Don't Have an Account ? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
