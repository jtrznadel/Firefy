import React from 'react'
import { Container } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import '../App.css';


export default function Login() {
    const CLIENT_ID = "aa8201b71f524c6d8f635b29cdaa48b4"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
  
    const [token, setToken] = useState("")
  
    useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")
  
      if(!token && hash){
           token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
           window.location.hash= ""
           window.localStorage.setItem("token", token)
      }
      setToken(token)
    },[])
  
    const logout = () => {
      setToken("")
      window.localStorage.removeItem("token")
    }

  return (
    <Container className = "d-flex justify-center align-items-center">
      {!token
        ? <a className='btn loginButton' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login with Spotify</a>  
        : <button className='btn loginButton' onClick={logout}>Logout</button>
      }
    </Container>
    
  )
}

