import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { toast } from 'react-toastify'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
export default function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const [spinner, setSpinner] = useState(false)
  const signup = async (e) => {
    e.preventDefault()
    setSpinner(true)
    try {
      const { data } = await Axios.post('/signup', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      })
      console.log(data)
      setSpinner(false)
      if (data) {
        console.log(data.message)

        toast.success(data.message)
        navigate('/login')
      }
    } catch (err) {
      setSpinner(false)

      toast.error(err.response.data.message)
      console.log(err)
    }
  }

  return (
    <>
      <div className="container d-flex justify-content-center mt-5">
        <div className="container d-flex justify-content-center mt-5">
          <form className="p-5 for">
            <h3 className="mb-5 heading text-center">Create An Account</h3>
            <div className="d-flex justify-content-center mb-5">
              <div>
                <label className="text-light">First Name</label>
                <input
                  type="text"
                  className="form-control account"
                  //   placeholder="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                />
              </div>
              <div className="mx-3">
                <label className="text-light">Last Name</label>
                <input
                  type="text"
                  className="form-control account"
                  //   placeholder="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                />
              </div>
            </div>
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
              <div className="d-flex justify-content-center align-items-center">
                <input
                  type={`${show ? 'text' : 'password'}`}
                  className="form-control account position-relative"
                  // placeholder="Email Address"
                  name="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                {show ? (
                  <p
                    className="text-light fw-bold position-absolute"
                    onClick={() => setShow(false)}
                    style={{
                      marginLeft: '515px',
                      marginTop: '15px',
                      cursor: 'pointer',
                    }}
                  >
                    Show
                  </p>
                ) : (
                  <p
                    className="text-light fw-bold position-absolute"
                    onClick={() => setShow(true)}
                    style={{
                      marginLeft: '515px',
                      marginTop: '15px',
                      cursor: 'pointer',
                    }}
                  >
                    Hide
                  </p>
                )}
              </div>
            </div>
            <div className="mb-5 d-flex flex-column justify-content-center">
              <button className="btn btn-dark sign_btn w-100" onClick={signup}>
                SignUp
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
                Already Have an Account ? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
