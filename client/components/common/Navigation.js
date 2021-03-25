import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink } from 'react-router-dom'

const Navigation = ()=>{

  let isLoggedIn
  if (!localStorage){
    isLoggedIn = false
  } else {
    isLoggedIn = localStorage.token
  }

  return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="/">
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        {!isLoggedIn && <>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
          <Nav.Link href="/music">Make Music</Nav.Link>
          <Nav.Link href="/songpage">The Song Community</Nav.Link>
        </>}
        {isLoggedIn && <>
          <Nav.Link href="/usersongpage">My Songs</Nav.Link>
          <Nav.Link href="/logout">Logout</Nav.Link>
        </>}
      </Nav>
      <Nav>
        {isLoggedIn && <>
          <div className="m-2 badge badge-secondary badge-success d-inline-flex align-items-center justify-content-start" color="white">
            Logged in <i className="fa fa-user-circle" aria-hidden="true" /></div>
        </>}
        <Nav.Link href="/about">About</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
}

export default Navigation