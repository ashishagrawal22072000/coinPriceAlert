import { Axios } from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import correct from "../src/assets/checked.png"
import wrong from "../src/assets/cross.png"
const Verify_email = () =>{
    const {token} = useParams()
    const [data, setData] = useState({})
    const [spinner, setSpinner] = useState(true)
    async function verifyEmail(){
        const data = await fetch(`/verify_email/${token}`)
        const res = await data.json()
        setSpinner(false)
        setData(res)        
    }
    
    useEffect(() =>{
        verifyEmail()
    },[])


    return (
        <>
        <div className="">
        {spinner ? (
                  <>
                <div style={{margin : "50px auto", display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center", transition : "2s ease-in-out"}}>
                  <h1 style={{transition : "5s", color : "white"}}>Loading ... </h1>
                  </div>
                    
                  </>
                ) : (
                  <>

{data && data.success ? <>
            <div style={{margin : "20px auto", display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center"}}>
            <img src={correct} />
            <h1 style={{color : "green"}}>{data.message}</h1>
            <div>
                <button style={{padding : "10px", textDecoration : "none", color : "black"}}><Link to="/login">Back To Login</Link></button>
            </div>
            </div>
            </> : <>
            <div style={{margin : "20px auto", display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center"}}>
            <img src={wrong} />
            <h1>{data.message}</h1>
            </div>
            </>}
                  </>
                )}
            
            
        </div>
        </>
    )
}

export default Verify_email;