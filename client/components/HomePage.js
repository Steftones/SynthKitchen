import React from 'react'
import { NavLink } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Navigation from './common/Navigation'

const HomePage = () => {
  
  return <>
    <Navigation />

      <div className="wholePage">

        <div className="deadCentre">
          <Card className="homePage centreText">
            <h1 className="display-4">SynthKitchen</h1>
            <p className="lead">A browser-based synthesizer and sequencer</p>
            <p className="lead">
              <NavLink className="navbar-item" to="/login">
                <button className="btn btn-primary btn-lg m-2">Login</button>
              </NavLink>
              <NavLink className="navbar-item" to="/register">
                <button className="btn btn-primary btn-lg m-2">Register</button>
              </NavLink>
            </p>
          </Card>
        </div>

      </div>

  </>

}

export default HomePage