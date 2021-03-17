import React from 'react'
import { NavLink } from 'react-router-dom'
import Navigation from './common/Navigation'
import { Container } from 'react-bootstrap'

const NotFoundPage = () => {
  
  return <>
    <Navigation />
    <Container className="pageContainer">
      <h1>Oops!</h1>
      <br />
      <h4>Your page cannot be found...</h4>
      <br />
      <NavLink className="navbar-item" to="/">
        <button className="btn btn-secondary btn-sm m-2">Home</button>
      </NavLink>
    </Container>
  </>

}

export default NotFoundPage