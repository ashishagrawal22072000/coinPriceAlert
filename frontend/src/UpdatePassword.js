import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Store } from './Store'
import { toast } from 'react-toastify'
import Axios from 'axios'
export default function UpdatePassword() {
  const [form, setForm] = useState({
    password: '',
    conf_password: '',
  })
  const [spinner, setSpinner] = useState(false)
  const { token } = useParams()

  const navigate = useNavigate()
  const changePassword = async (e) => {
    e.preventDefault()
    try {
      setSpinner(true)
      const { data } = await Axios.post(`/forget_password/${token}`, {
        password: form.password,
        conf_password: form.conf_password,
      })
      console.log(data)
      setSpinner(false)
      if (data) {
        navigate('/login')
      }
    } catch (err) {
      setSpinner(false)

      toast.error(err.response.data.message)
    }
  }

  return (
    <>
      <div className="container d-flex justify-content-center mt-5">
        <div className="container d-flex justify-content-center mt-5">
          <form className="p-5 for">
            <h3 className="mb-5 heading text-center">Reset Your Password</h3>

            <div className="mb-5">
              <label className="text-light">New Password</label>
              <input
                type="password"
                className="form-control account"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div className="mb-5">
              <label className="text-light">Confirm Password</label>
              <input
                type="password"
                className="form-control account"
                name="conf_password"
                value={form.conf_password}
                onChange={(e) =>
                  setForm({ ...form, conf_password: e.target.value })
                }
              />
            </div>
            <div className="mb-5 d-flex flex-column justify-content-center">
              <button
                className="btn btn-dark sign_btn w-100"
                onClick={changePassword}
              >
                Reset Password
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
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
