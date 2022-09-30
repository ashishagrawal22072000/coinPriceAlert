import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'
export default function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const signup = async (e) => {
    e.preventDefault()
    try {
      const data = await Axios.post('/signup', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      })
      console.log(data)
      if (data && data.status == 200) {
        navigate('/login')
      }
      // ctxDispatch({ type: "USER_SIGNIN", payload: data });
      // localStorage.setItem("userInfo", JSON.stringify(data));
      // navigate(redirect || "/");
    } catch (err) {
      // toast.error(getError(err))
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
              <button className="btn btn-dark sign_btn w-100" onClick={signup}>
                SignUp
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
