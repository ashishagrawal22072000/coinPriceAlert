import React, { useContext, useEffect, useState } from 'react'
import Axios from 'axios'
import { Store } from './Store'
import { Link } from 'react-router-dom'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
export default function Track() {
  const [track, setTrack] = useState([])
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const [spinner, setSpinner] = useState(false)
  const {
    // track: { alert },
    userInfo,
  } = state
  useEffect(() => {
    fetchTrack()
  }, [])

  const fetchTrack = async () => {
    setSpinner(true)
    try {
      const { data } = await Axios.get('/track', {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.token}`,
        },
      })
      console.log(data)
      setSpinner(false)
      if (data) {
        setTrack(data.data)
      }
    } catch (err) {
      setSpinner(false)
      console.log(err)
    }
  }

  // console.log(alert)

  const deleteAlert = async (id) => {
    console.log(id)
    const confirm = window.confirm(
      'Are you sure you want to delete this alert?',
    )
    if (confirm) {
      const { data } = await Axios.delete(`/track/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.token}`,
        },
      })
      console.log(data)
      if (data) {
        console.log(data.message)
        fetchTrack()
      } else {
        console.log(data.message)
      }
    }
  }

  return (
    <div>
      <h3 className="text-light text-center mt-5">My Targets</h3>
      {spinner ? (
        <>
          <div className="container-fluid d-flex justify-content-center align-items-center p-5">
            <div className="container-fluid d-flex justify-content-center align-items-center p-5">
              <span
                className="spinner-border spinner-border-sm text-light"
                role="status"
                style={{ fontSize: '30px' }}
                aria-hidden="true"
              ></span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container-fluid d-flex justify-content-center align-items-center">
            {track.length === 0 ? (
              <>
                <h1 className="text-light text-center">No Track Found</h1>
              </>
            ) : (
              <>
                <table className="container mt-5 table tab">
                  <thead>
                    <th>Email</th>
                    <th>Target</th>
                    <th>CoinType</th>
                    <th>Duration</th>
                    <th>Edit</th>
                  </thead>
                  <tbody>
                    {track.map((ele) => {
                      console.log(ele)
                      return (
                        <tr key={ele._id}>
                          <td>{ele.email}</td>
                          <td>{ele.target}</td>
                          <td>{ele.coinType}</td>
                          <td>{ele.updatedAt.slice(0, 10)}</td>
                          <td className="d-flex justify-content-start">
                            <Link to={`/edit/${ele._id}`}>
                              <button className="btn btn-dark">
                                <AiFillEdit />
                              </button>
                            </Link>
                            <button
                              className="btn btn-dark mx-3"
                              onClick={() => deleteAlert(ele._id)}
                            >
                              <AiFillDelete />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
