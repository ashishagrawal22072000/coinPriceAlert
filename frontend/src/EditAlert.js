import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Axios from 'axios'
import { Store } from './Store'
import { toast } from 'react-toastify'
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
  const [spinner, setSpinner] = useState(false)
  const navigate = useNavigate()
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
    setSpinner(true)
    const { email, target, coinType } = form
    if (email == '' || target == '' || coinType == '') {
      toast.error('Please Fill All The Fields First')
    } else {
      const res = await fetch(`/track/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          target,
          coinType,
          userID: userInfo._id,
        }),
      })

      const data = await res.json()
      setSpinner(false)
      if (res.status === 400 || !data) {
        toast.error(data.message)
        setSpinner(false)
        console.log(res)
      } else {
        toast.success(data.message)
        Navigate('/track')
        console.log(res)
      }
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
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="mt-3">
                <label className="text-light">Target</label>
                <input
                  type="text"
                  className="form-control account"
                  value={form.target}
                  onChange={(e) => setForm({ ...form, target: e.target.value })}
                />
              </div>
              <div className="mt-3">
                <label className="text-light">CoinType</label>
                <input
                  type="text"
                  className="form-control account"
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
    </div>
  )
}
