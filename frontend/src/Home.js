import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store } from './Store'
export default function Home() {
  const { state } = useContext(Store)
  const { userInfo } = state
  const [coins, setCoins] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [currency, setCurrency] = useState('usd')

  const [coinName, setCoinName] = useState('')
  console.log(userInfo.data)
  const [form, setForm] = useState({
    email: '',
    target: '',
    coinType: '',
  })
  const navigate = useNavigate()
  useEffect(() => {
    calldata()
  }, [page])

  const calldata = async () => {
    const options = {
      method: 'GET',
    }

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinName}&order=market_cap_desc&per_page=25&page=${page}&sparkline=false`,
      options,
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setCoins(response)
      })
      .catch((err) => console.error(err))
  }

  // useEffect(() => {
  //   if (page == 0) {
  //     setData(coins.slice(0, page + 25))
  //   } else {
  //     setData(coins.slice(page, page + 25))
  //   }
  // }, [page])

  const setAlert = async (e) => {
    e.preventDefault()
    console.log(form)
    const { email, target, coinType } = form
    const res = await fetch('/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo.data.token}`,
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
      setForm({ email: '', target: '', coinType: '' })
      // toast.success(data.message);
      // navigate("/login", { replace: true });
    }
  }

  return (
    <div>
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className="container mt-5">
          <input
            type="text"
            className="form-control input"
            placeholder="Enter Coin Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <table className="container mt-5 table tab">
          <tbody>
            {coins
              .filter((ele) => {
                if (search == '') {
                  return ele
                } else if (
                  ele.id.toLowerCase().includes(search.toLowerCase())
                ) {
                  return ele
                } else {
                  return false
                }
              })
              .map((ele) => {
                return (
                  <>
                    <tr className="mt-5">
                      <td>
                        <img src={ele.image} height="25px" width="25px" />
                      </td>
                      <td>
                        {ele.id.slice(0, 1).toUpperCase() + ele.id.slice(1)}
                      </td>
                      <td>{ele.symbol.toUpperCase()}</td>
                      <td>${ele.current_price}</td>
                      <td>${ele.total_volume}</td>

                      <td
                        style={{
                          color:
                            ele.price_change_percentage_24h > 0
                              ? 'green'
                              : 'red',
                        }}
                      >
                        {ele.price_change_percentage_24h}
                      </td>
                      <td>${ele.market_cap}</td>
                    </tr>
                  </>
                )
              })}
            {/* {coins.map((coin) => {
                return (
                  <>
                    <tr className="mt-5">
                      <td>
                        <img src={coin.image} height="25px" width="25px" />
                      </td>
                      <td>
                        {coin.id.slice(0, 1).toUpperCase() + coin.id.slice(1)}
                      </td>
                      <td>{coin.symbol.toUpperCase()}</td>
                      <td>${coin.current_price}</td>
                      <td>${coin.total_volume}</td>
  
                      <td
                        style={{
                          color:
                            coin.price_change_percentage_24h > 0
                              ? 'green'
                              : 'red',
                        }}
                      >
                        {coin.price_change_percentage_24h}
                      </td>
                      <td>${coin.market_cap}</td>
                    </tr>
                  </>
                )
              })} */}
          </tbody>
        </table>
      </div>
      <div className="container d-flex justify-content-between">
        <button
          className="btn btn-dark"
          disabled={page == 1 ? true : false}
          onClick={() => {
            console.log(coins)

            setPage(page - 1)
          }}
        >
          Prev
        </button>
        <button
          className="btn btn-dark"
          disabled={page == 10 ? true : false}
          onClick={() => {
            console.log(coins)

            setPage(page + 1)
          }}
        >
          Next
        </button>
      </div>
      <hr />

      <div className="container d-flex justify-content-center mt-5">
        <div className="container d-flex justify-content-center mt-5">
          <form className="p-5 for">
            <h3 className="mb-5 heading text-center">Set Your Target</h3>
            <div className="d-flex justify-content-center mb-5">
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
              <div className="mx-3">
                <label className="text-light">Target</label>
                <input
                  type="text"
                  className="form-control account"
                  // placeholder="Enter Your Target"
                  value={form.target}
                  onChange={(e) => setForm({ ...form, target: e.target.value })}
                />
              </div>
            </div>
            <div className="mb-5">
              <select
                value={form.coinType}
                className="account text-light w-100"
                onChange={(e) => setForm({ ...form, coinType: e.target.value })}
              >
                <option className="text-dark">Select Coin</option>
                {coins.map((ele) => {
                  return (
                    <>
                      <option className="text-dark" value={ele.symbol}>
                        {ele.symbol.toUpperCase()}
                      </option>
                    </>
                  )
                })}
              </select>
            </div>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                type="submit"
                onClick={setAlert}
              >
                Set Alert
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
