import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Store } from './Store'
import { toast } from 'react-toastify'
import Axios from 'axios'
export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [spinner, setSpinner] = useState(false)

  const signin = async (e) => {
    e.preventDefault()
    try {
      setSpinner(true)
      const { data } = await Axios.post('/change_password', {
        email: email,
      })
      console.log(data)
      setSpinner(false)
      if (data) {
        toast.success(data.message)
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
            <h3 className="mb-5 heading text-center">
              Forget Your Password ??
            </h3>

            <div className="mb-5">
              <label className="text-light">Email Address</label>
              <input
                type="email"
                className="form-control account"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-5 d-flex flex-column justify-content-center">
              <button className="btn btn-dark sign_btn w-100" onClick={signin}>
                Send Link
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
