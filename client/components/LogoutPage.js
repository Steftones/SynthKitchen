import React from 'react'
import { NavLink } from 'react-router-dom'
import Navigation from './common/Navigation'
import { Container } from 'react-bootstrap'

const LogoutPage = () => {

  if (localStorage) localStorage.removeItem('token')

  const randText = () => {
    const arr = [
      'Hope to see you soon!', 'Come back soon!', 'Come back real soon!',
      'Make music again soon!', 'Cya again!', 'Come back and make tunes soon!']
    return arr[Math.floor(Math.random() * arr.length)]
  }
  
  return <>
    <Navigation />
    <Container className="pageContainer">
      <h1>You have logged out!</h1>
      <br />
      <h4>{randText()}</h4>
      <br />
      <NavLink className="navbar-item" to="/login">
        <button className="btn btn-secondary btn-sm m-2">Login</button>
      </NavLink>
    </Container>
  </>

}

export default LogoutPage