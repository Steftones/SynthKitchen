import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Sequencer from './components/Sequencer'
import HomePage from './components/HomePage.js'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import AboutPage from './components/AboutPage'
import LogoutPage from './components/LogoutPage'
import SongPage from './components/SongPage'
import UserSongPage from './components/UserSongPage'
import NotFoundPage from './components/NotFoundPage'
import { UserContext } from './UserContext'

import './styles/style.scss'

const App = () => {
  
  const [value, setValue] = useState({ 
    currentSong: {
      songName: 'Untitled',
      genre: 'None',
      tempo: 130,
      songKey: 'A',
      songScale: 'naturalMinor',
      octave: 4,
      notes: ['A4', 'G#4', 'F#4', 'E4', 'D4', 'C#4', 'B3', 'A3'],
      drums: [
        [{ playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' },
          { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, 
          { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, 
          { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }], // kick
        [{ playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' },
          { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, 
          { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, 
          { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }], // snare
        [{ playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' },
          { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, 
          { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, 
          { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }], // hat
        [{ playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' },
          { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, 
          { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, 
          { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }]  // perc
      ],
      kickEffect: 'None',
      kickVolume: 1,
      snareEffect: 'None',
      snareVolume: 1,
      hatEffect: 'None',
      hatVolume: 1,
      percEffect: 'None', 
      percVolume: 1,
      osc1: [{ playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' },
        { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, 
        { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, 
        { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }, { playNote: '-', probability: 1, condition: '1:1' }],
      osc1Settings: {
        synthType: 'FMSynth',
        oscType: 'sine',
        envelope: {
          attack: 0.005,
          decay: 0.1,
          sustain: 0.3,
          release: 1
        },
        volume: 0 
      },
      osc1Effect: 'None', 
      grid: [
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
      ],
      osc2: [{ playNote: [], probability: 1 , condition: '1:1' }, { playNote: [], probability: 1 , condition: '1:1' }, { playNote: [], probability: 1 , condition: '1:1' }, { playNote: [], probability: 1 , condition: '1:1' },
        { playNote: [], probability: 1 , condition: '1:1' }, { playNote: [], probability: 1 , condition: '1:1' }, { playNote: [], probability: 1 , condition: '1:1' }, { playNote: [], probability: 1 , condition: '1:1' },
        { playNote: [], probability: 1 , condition: '1:1' }, { playNote: [], probability: 1 , condition: '1:1' }, { playNote: [], probability: 1 , condition: '1:1' }, { playNote: [], probability: 1 , condition: '1:1' },
        { playNote: [], probability: 1 , condition: '1:1' }, { playNote: [], probability: 1 , condition: '1:1' }, { playNote: [], probability: 1 , condition: '1:1' }, { playNote: [], probability: 1 , condition: '1:1' }],
      osc2Settings: {
        synthType: 'Synth',
        oscType: 'square',
        envelope: {
          attack: 0.5,
          decay: 0.1,
          sustain: 0.3,
          release: 1
        },
        volume: 0 
      },
      osc2Effect: 'None', 
      polyGrid: [
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
      ],
      user: null
    },
    songUser: { id: null },
    songId: null
  })

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ value, setValue }}>
        <Switch>
          <Route exact path="/not-found" component={NotFoundPage}/>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/music" component={Sequencer}/>
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/songpage" component={SongPage}/>
          <Route exact path="/usersongpage" component={UserSongPage}/>
          <Route exact path="/about" component={AboutPage}/>
          <Route exact path="/logout" component={LogoutPage}/>
          <Redirect to="/not-found"/>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App