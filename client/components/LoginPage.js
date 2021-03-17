import React, { useState } from 'react'
import axios from 'axios'
import Navigation from './common/Navigation'
import { Row, Col, Card, Container } from 'react-bootstrap'
import CustomToast from './common/CustomToast'

export default function LoginPage({ history }){

  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  })
  const [showError, setShowError] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  function handleChange(event){
    const name = event.target.name
    const value = event.target.value
    updateFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(event){
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formData)
      localStorage.setItem('token', data.token)
      history.push('/music')
    } catch (err) {
      setToastMessage(err.response.data.message)
      setShowError(!showError)
    }
  }

  return <>

  <Navigation />

      <div className="wholePage">
        <CustomToast message={toastMessage} show={showError} setShow={setShowError} />
        <div className="deadCentre">
          <Card className="homePage centreText">
            <h1 className="display-4">Login</h1>
            <p className="lead">Start synthesizing</p>
            <p className="lead">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  name={'email'}
                />
                <br />
                <input
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  name={'password'}
                />
                <br />
                <button className="btn btn-secondary btn-sm m-2">Submit</button> 
              </form>

            </p>
          </Card>
        </div>

      </div>

  </>
}

