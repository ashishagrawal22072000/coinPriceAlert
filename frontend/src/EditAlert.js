import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { Store } from './Store'
export default function EditAlert() {
  const { id } = useParams()
  console.log(id)
  const { state } = useContext(Store)
  const { userInfo } = state
  const [form, setForm] = useState({
    email: '',
    target: '',
    coinType: '',
  })
  useEffect(() => {
    fetchAlert()
  }, [])

  const fetchAlert = async () => {
    const { data } = await Axios.get(`/track/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (data) {
      setForm(data.data)
      console.log(form)
    }
  }

  const updateAlert = async (e) => {
    e.preventDefault()
    const { email, target, coinType } = form
    const res = await fetch(`/track/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        target,
        coinType,
        userID: userInfo.data._id,
      }),
    })

    const data = await res.json()
    // setSpinner(false);
    if (res.status === 400 || !data) {
      // toast.error(data.error[0].msg);
      console.log(res)
    } else {
      console.log(res)
      // toast.success(data.message);
      // navigate("/login", { replace: true });
    }
  }

  return (
    <div>
      <div className="container d-flex justify-content-center mt-5">
        <div className="container d-flex  justify-content-center mt-5">
          <form className="p-5 for">
            <h3 className="mb-5 heading text-center">Edit Your Target</h3>
            <div className="d-flex flex-column justify-content-center mb-5">
              <div>
                <label className="text-light">Email Address</label>
                <input
                  type="email"
                  className="form-control account"
                  // placeholder="Enter your email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="mt-3">
                <label className="text-light">Target</label>
                <input
                  type="text"
                  className="form-control account"
                  // placeholder="Enter Your Target"
                  value={form.target}
                  onChange={(e) => setForm({ ...form, target: e.target.value })}
                />
              </div>
              <div className="mt-3">
                <label className="text-light">CoinType</label>
                <input
                  type="text"
                  className="form-control account"
                  // placeholder="Enter Your Target"
                  value={form.coinType}
                  onChange={(e) =>
                    setForm({ ...form, coinType: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                type="submit"
                onClick={updateAlert}
              >
                Update Alert
              </button>
            </div>
            {/* <div className="mb-5 d-flex flex-column justify-content-center">
              <button className="btn btn-dark sign_btn w-100" onClick={signup}>
                SignUp
              </button>
              <p className="text-center text-light">
                Already Have an Account ? <Link to="/login">Login</Link>
              </p>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  )
}
