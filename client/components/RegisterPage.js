import React, { useState } from 'react'
import axios from 'axios'
import Navigation from './common/Navigation'
import { Card } from 'react-bootstrap'
import CustomToast from './common/CustomToast'

export default function RegisterPage({ history }){

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [showError, setShowError] = useState(false)
  const [toastMessage, setToastMessage] = useState('')  

  async function handleSubmit(event){
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/register', formData)
      if (data.id){
        history.push('/login')
      } else {
        setToastMessage('Please fill in all the required fields')
        setShowError(!showError)
      }
    } catch (err) {
      console.log(err.response)
      setToastMessage(err.response.data.message)
      setShowError(!showError)
    }
  }

  function handleChange(event){
    const name = event.target.name
    const value = event.target.value
    updateFormData({ ...formData, [name]: value })
  }

  return <>
  <Navigation />
  <div className="wholePage">
    <CustomToast message={toastMessage} show={showError} setShow={setShowError} />
    <div className="deadCentre">
      <Card className="homePage centreText">
        <h1 className="display-4">Register</h1>
        <p className="lead">Fill in your details to get started</p>
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
      </Card>
    </div>

  </div>
  </>
}

