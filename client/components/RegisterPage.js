import React, { useState } from 'react'
import axios from 'axios'
import Navigation from './common/Navigation'
import { Row, Col, Container } from 'react-bootstrap'

export default function RegisterPage({ history }){

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  async function handleSubmit(event){
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/register', formData)
      if (data.id){
        history.push('/login')
      } else {
        alert('please fill in all fields')
      }
    } catch (err) {
      console.log(err.response)
    }
  }

  function handleChange(event){
    const name = event.target.name
    const value = event.target.value
    updateFormData({ ...formData, [name]: value })
  }

  return <>
  <Navigation />
  <Container className="pageContainer">
    <Row>
      <Col>
        <div className="centreText">
          <h1 className="m-2">Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              className="formInput"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username (15 chars max)"
              name={'username'}
              maxLength="15"
            />
            <br />
            <input
              className="formInput"
              type="text"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              name={'email'}
            />
            <br />
            <input
              className="formInput"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              name={'password'}
            />
            <br />
            <button className="btn btn-secondary btn-sm m-2">Submit</button> 
          </form>
        </div>
      </Col>
    </Row>
  </Container>
  </>
}

