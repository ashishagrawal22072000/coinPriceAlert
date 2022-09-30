import React, { useState, useEffect } from 'react'

export default function Table({ coins }) {
  // const [coins, setCoins] = useState([])
  const [data, setData] = useState([])
  const [currency, setCurrency] = useState('usd')
  const [coinName, setCoinName] = useState('')
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setData(coins.slice(page, page + 25))
    console.log(data)
  }, [coins])
  return (
    <div>
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <table className="container mt-5 table tab">
          <tbody>
            {data
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
          className="btn btn-light"
          disabled={page == 0 ? true : false}
          onClick={() => {
            console.log(coins)

            setPage(page - 25)
          }}
        >
          Prev
        </button>
        <button
          className="btn btn-light"
          disabled={page == 250 ? true : false}
          onClick={() => {
            console.log(coins)

            setPage(page + 25)
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}
