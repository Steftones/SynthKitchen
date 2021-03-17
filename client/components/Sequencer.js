import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext'
import Navigation from './common/Navigation'
import ADSR from './common/ADSR'
import OscType from './common/OscType'
import Volume from './common/Volume'
import Key from './common/Key'
import Probability from './common/Probability'
import SaveModal from './common/SaveModal'
import Help from './common/Help'
import Effect from './common/Effect'
import TempoComponent from './common/TempoComponent'
import { getLoggedInUserId } from '../lib/auth'
import { Button, Container, Row, Col, Collapse } from 'react-bootstrap'
import axios from 'axios'
import StepNote from './common/StepNote'
import * as Tone from 'tone'

class Instrument {
  constructor(){
    this.synth = null
    this.filter = null
    this.effect = null
    this.gain = new Tone.Gain()
    this.gain.toDestination()
  }

  getEnvelope(input){
    return this.synth.envelope[input]
  }

  getSettings(){
    return {
      synthType: this.synth.name,
      oscType: this.synth.oscillator.type,
      envelope: {
        attack: this.synth.envelope.attack,
        decay: this.synth.envelope.decay,
        sustain: this.synth.envelope.sustain,
        release: this.synth.envelope.release
      },
      volume: this.synth.volume.value
    }
  }

  get defaultSettings(){
    return {
      Synth: {
        oscillator: {
          type: 'triangle',
          volume: -5
        },
        envelope: {
          attack: 0.005,
          decay: 0.1,
          sustain: 0.3,
          release: 1
        }
      },
      FMSynth: {
        harmonicity: 3 ,
        modulationIndex: 10 ,
        detune: 0 ,
        oscillator: {
          type: 'sine',
          volume: -5
        } ,
        envelope: {
          attack: 0.01 ,
          decay: 0.01 ,
          sustain: 1 ,
          release: 0.01
        } ,
        modulation: {
          type: 'square',
          volume: -5
        } ,
        modulationEnvelope: {
          attack: 0.5 ,
          decay: 0 ,
          sustain: 1 ,
          release: 0.5
        }
      },
      AMSynth: {
        harmonicity: 3 ,
        detune: 0 ,
        oscillator: {
          type: 'sine',
          volume: -5
        },
        envelope: {
          attack: 0.01 ,
          decay: 0.01 ,
          sustain: 1 ,
          release: 0.5
        },
        modulation: {
          type: 'square',
          volume: -5
        },
        modulationEnvelope: {
          attack: 0.5 ,
          decay: 0 ,
          sustain: 1 ,
          release: 0.5
        }
      },
      // drum related synths
      MembraneSynth: {
        volume: -6,
        envelope: {
          attack: 0.001,
          decay: 0.5,
          sustain: 0,
          release: 0.3
        }
      },
      NoiseSynth: {
        volume: -6,
        noise: {
          type: 'white',
          playbackRate: 3
        },
        envelope: {
          attack: 0.001,
          decay: 0.20,
          sustain: 0.008,
          release: 0.03
        }
      },
      MetalSynth: {
        frequency: 200 ,
        envelope: {
          attack: 0.001,
          decay: 1.4,
          release: 0.2
        },
        harmonicity: 5.1 ,
        modulationIndex: 32 ,
        resonance: 4000 ,
        octaves: 1.5
      }
    }
  }

  // effects
  addEffect(effect){
    if (!this.synth) return
    if (this.effect) this.synth.disconnect(this.effect)
    switch (effect){
      case 'Reverb':
        this.effect = new Tone.Reverb(4).toDestination()
        break
      case 'Bitcrusher':
        this.effect = new Tone.BitCrusher(4).toDestination()
        break
      case 'Chorus':
        this.effect = new Tone.Chorus(5, 2.5, 0.7).toDestination()
        break
      case 'Distortion':
        this.effect = new Tone.Distortion(0.8).toDestination()
        break
      case 'Delay':
        this.effect = new Tone.FeedbackDelay("8n", 0.5).toDestination()
        break
      case 'Phaser':
        this.effect = new Tone.Phaser({
          frequency: 15,
          octaves: 5,
          baseFrequency: 1000
        }).toDestination()
        break
      default:
        return
    }
    this.effect.wet.value = 1
    this.synth.connect(this.effect)
  }
    
  play(note = null, beat, time = null){
    if (this.synth){
      if (note === null){
        time ? this.synth.triggerAttackRelease(beat, time) : this.synth.triggerAttackRelease(beat)
      } else { 
        time ? this.synth.triggerAttackRelease(note, beat, time) : this.synth.triggerAttackRelease(note, beat)
      }
    } else {
      alert('error: no synth')
    }
  }

  updateVolume(value){ 
    this.synth.volume.value = value
  }

  updateOscillatorType(value){
    this.synth.set({ oscillator: {
      ['type']: value
    } })
  }

  addFilter(){
    this.filter = new Tone.Filter({
      type: 'lowpass',
      frequency: 7350,
      Q: 1,
      gain: 0
    }).toDestination()
    this.synth.connect(this.filter)
  }

  updateFilter(param, value){
    this.synth.filter[param] = value
  }

  updateEnvelope(param, value){
    this.synth.set({ envelope: {
      [param]: value
    } })
  }

  dispose(){
    if (this.synth){
      this.synth.disconnect(this.gain)
      if (this.filter) this.synth.disconnect(this.filter)
      this.synth.dispose()
    }
  }

}

class MonoInstrument extends Instrument {
  updateSynthType(synthType){
    this.dispose()
    const settings = this.defaultSettings[synthType] || {} 
    this.synth = new Tone[synthType]
    this.synth.set(settings)
    this.synth.connect(this.gain)
  }
}

class PolyInstrument extends Instrument {
  constructor(){
    super()
    this.synth = new Tone.PolySynth()
    this.synthType = 'Synth'
    this.gain = new Tone.Gain()
    this.gain.toDestination()
  }

  getPolySettings(){
    return {
      synthType: this.synthType,
      oscType: this.synth.options.oscillator.type,
      envelope: {
        attack: this.synth.options.envelope.attack,
        decay: this.synth.options.envelope.decay,
        sustain: this.synth.options.envelope.sustain,
        release: this.synth.options.envelope.release
      },
      volume: this.synth.volume.value
    }
  }

  get defaultosc2Settings(){
    return {
      Synth: {
        oscillator: {
          type: 'triangle',
          volume: -10
        },
        envelope: {
          attack: 0.005,
          decay: 0.1,
          sustain: 0.3,
          release: 1
        }
      },
      AMSynth: {
        harmonicity: 3 ,
        detune: 0 ,
        oscillator: {
          type: 'sine',
          volume: -15
        },
        envelope: {
          attack: 0.01 ,
          decay: 0.01 ,
          sustain: 1 ,
          release: 0.5
        },
        modulation: {
          type: 'square',
          volume: -15
        },
        modulationEnvelope: {
          attack: 0.5 ,
          decay: 0 ,
          sustain: 1 ,
          release: 0.5
        }
      }
    }
  }

  updateSynthType(synthType){
    const settings = this.defaultosc2Settings[synthType] || {}
    this.synth.set(settings)
    this.synthType = synthType
    this.synth.connect(this.gain)
  }
}

let osc1 = new MonoInstrument()
let osc2 = new PolyInstrument()

let oscKick = new MonoInstrument()
oscKick.updateSynthType('MembraneSynth')
oscKick.updateEnvelope('attack', 0.001)
oscKick.updateEnvelope('decay', 0.5)
oscKick.updateEnvelope('sustain',0)
oscKick.updateEnvelope('release', 0.3)

let oscSnare = new MonoInstrument()
oscSnare.updateSynthType('NoiseSynth')
oscSnare.addFilter()
oscSnare.updateEnvelope('attack', 0.001)
oscSnare.updateEnvelope('decay', 0.2)
oscSnare.updateEnvelope('sustain',0.008)
oscSnare.updateEnvelope('release', 0.03)

let oscHat = new MonoInstrument()
oscHat.updateSynthType('NoiseSynth')
oscHat.addFilter()
oscHat.updateEnvelope('attack', 0)
oscHat.updateEnvelope('decay', 0.05)
oscHat.updateEnvelope('sustain',0.0005)
oscHat.updateEnvelope('release', 0.007)

let oscPerc = new MonoInstrument() 
oscPerc.updateSynthType('MetalSynth') 

const Sequencer = () => {

  const { value, setValue } = useContext(UserContext)
  const [stepIndex, setStepIndex] = useState(0)
  const [previewMode, setPreviewMode] = useState(true)
  const [loggedInUser, setLoggedInUser] = useState(getLoggedInUserId())
  const [helpState, setHelpState] = useState(false)
  const [kickOpen, setKickOpen] = useState(false) 
  const [snareOpen, setSnareOpen] = useState(false) 
  const [percOpen, setPercOpen] = useState(false)
  const [hatOpen, setHatOpen] = useState(false) 

  if (!getLoggedInUserId()){
    return <>
      <Navigation />
      <Container className="pageContainer">
        <div>Please login!</div>
      </Container>
    </>
  }

  function changeDrumGridByVal(val){
    const drumType = val[0]
    const step = val.substring(2)
    const copy = { ...value }
    if (copy.currentSong.drums[drumType][step].playNote !== '-'){
      copy.currentSong.drums[drumType][step].playNote = '-' 
      setValue(copy)
    } else {
      copy.currentSong.drums[drumType][step].playNote = 'C1' // default value
      setValue(copy)
      if (previewMode){
        switch (drumType){
          case '0':
            oscKick.play('C1','8n') // default value of C1
            break
          case '1':
            oscSnare.play(null, '8n')
            break
          case '2':
            oscHat.play(null, '8n')
            break
          case '3': 
            oscPerc.play('C1', '8n') 
            break
          default:
            console.log('error')
        }
      } 
    }
  }

  function changePolyGridByVal(val){
    const note = val[0]
    const step = val.substring(2)
    const copy = { ...value }
    if (copy.currentSong.polyGrid[note][step] !== '-'){ // if the note is present
      copy.currentSong.polyGrid[note][step] = '-'
      const newNotes = copy.currentSong.polySynth[step].playNote.filter(e => e !== note)
      copy.currentSong.polySynth[step].playNote = newNotes
      setValue(copy)
    } else {
      copy.currentSong.polyGrid[note][step] = note
      copy.currentSong.polySynth[step].playNote.push(note)
      setValue(copy)
      if (previewMode) osc2.play(value.currentSong.notes[note], '8n')
    }
  }

  function changeGridByVal(val){
    const note = val[0]
    const step = val.substring(2)
    const copy = { ...value }
    if (copy.currentSong.grid[note][step] !== '-'){
      copy.currentSong.grid[note][step] = '-'
      copy.currentSong.osc1[step] = '-'
      setValue(copy)
    } else {
      for (let i = 0; i < copy.currentSong.grid.length; i++){
        if (copy.currentSong.grid[i][step] !== '-') {
          copy.currentSong.grid[i][step] = '-'
          copy.currentSong.osc1[step] = '-'
          setValue(copy)
        }
      }
      copy.currentSong.grid[note][step] = note
      copy.currentSong.osc1[step] = note
      setValue(copy)
      if (previewMode){
        osc1.play(value.currentSong.notes[note], '8n')
      }
    }
  }

  const [isPlaying, setIsPlaying] = useState(false)
  function startStop(){
    setIsPlaying(!isPlaying)
    !isPlaying ? Tone.Transport.start() : Tone.Transport.stop()
  }

  const scales = {
    chromatic: [7, 6, 5, 4, 3, 2, 1, 0],
    major: [12, 11, 9, 7, 5, 4, 2, 0],
    naturalMinor: [12, 10, 8, 7, 5, 3, 2, 0],
    harmonicMinor: [12, 11, 8, 7, 5, 3, 2, 0],
    melodicMinor: [12, 11, 9, 7, 5, 3, 2, 0],
    wholeTone: [14, 12, 10, 8, 6, 4, 2, 0],
    majorPentatonic: [16, 14, 12, 9, 7, 4, 2, 0],
    minorPentatonic: [17, 15, 12, 10, 8, 5, 3, 0],
    transposeScale(key, scale){
      const currentOctave = value.currentSong.notes[value.currentSong.notes.length - 1].slice(-1)
      const transposed = this[scale].map(e => Tone.Frequency(`${key}${currentOctave}`).transpose(e).toNote())
      const copy = { ...value }
      copy.currentSong.notes = transposed
      copy.currentSong.songKey = key
      copy.currentSong.songScale = scale
      setValue(copy)
    },
    changeOctave(octave){
      let currentOctave = parseInt(value.currentSong.notes[value.currentSong.notes.length - 1].slice(-1))
      currentOctave = currentOctave += octave
      if (currentOctave < 0 || currentOctave > 8) return
      const transposed = this[value.currentSong.songScale].map(e => Tone.Frequency(`${value.currentSong.songKey}${currentOctave}`).transpose(e).toNote())
      const copy = { ...value }
      copy.currentSong.notes = transposed
      copy.currentSong.octave = currentOctave
      setValue(copy)
    }
  }

  // init
  Tone.Transport.bpm.value = value.currentSong.tempo

  let index = 0
  // osc1 repeat
  function repeat(time){
    const position = index % value.currentSong.osc1.length
    const synthNote = value.currentSong.osc1[position]
    if (synthNote !== '-') osc1.play(value.currentSong.notes[synthNote], '8n', time)
    index++
  }

  let indexPoly = 0
  // poly synth repeat
  function repeatPoly(time){
    const position = indexPoly % value.currentSong.polySynth.length
    const polyNote = value.currentSong.polySynth[position]
    if (polyNote.playNote.length !== 0 && Math.random() <= polyNote.probability){
      const playNotesInScale = []
      polyNote.playNote.forEach((n) => {
        playNotesInScale.push(value.currentSong.notes[n])
      })
      osc2.play(playNotesInScale, '8n', time)
    }
    indexPoly++
  }

  let indexDrums = 0
  // drums repeat
  function repeatDrums(time){
    const position = indexDrums % value.currentSong.drums[0].length
    setStepIndex(indexDrums % value.currentSong.osc1.length) // setting the step index
    const kick = value.currentSong.drums[0][position]
    const snare = value.currentSong.drums[1][position]
    const hat = value.currentSong.drums[2][position]
    const perc = value.currentSong.drums[3][position]
    if (kick.playNote !== '-' && Math.random() <= kick.probability){
      oscKick.play(kick.playNote,'8n', time)
    }
    if (snare.playNote !== '-' && Math.random() <= snare.probability){
      oscSnare.play(null, '8n', time)
    }
    if (hat.playNote !== '-' && Math.random() <= hat.probability){
      oscHat.play(null, '8n', time)
    }
    if (perc.playNote !== '-' && Math.random() <= perc.probability){
      oscPerc.play(perc.playNote, '8n', time) 
    } 
    indexDrums++
  }

  let useEffectStarted = false
  useEffect(() => {
    setIsPlaying(false)
    if (useEffectStarted) return
    scales.transposeScale(value.currentSong.songKey, value.currentSong.songScale)

    // init instruments with settings from context
    osc1.updateSynthType(value.currentSong.osc1Settings.synthType)
    osc1.updateOscillatorType(value.currentSong.osc1Settings.oscType)
    osc1.updateEnvelope('attack', value.currentSong.osc1Settings.envelope.attack)
    osc1.updateEnvelope('decay', value.currentSong.osc1Settings.envelope.decay)
    osc1.updateEnvelope('sustain', value.currentSong.osc1Settings.envelope.sustain)
    osc1.updateEnvelope('release', value.currentSong.osc1Settings.envelope.release)
    osc1.updateVolume(value.currentSong.osc1Settings.volume)
    osc1.addEffect(value.currentSong.osc1Effect)

    osc2.updateSynthType(value.currentSong.osc2Settings.synthType)
    osc2.updateOscillatorType(value.currentSong.osc2Settings.oscType)
    osc2.updateEnvelope('attack', value.currentSong.osc2Settings.envelope.attack)
    osc2.updateEnvelope('decay', value.currentSong.osc2Settings.envelope.decay)
    osc2.updateEnvelope('sustain', value.currentSong.osc2Settings.envelope.sustain)
    osc2.updateEnvelope('release', value.currentSong.osc2Settings.envelope.release)
    osc2.updateVolume(value.currentSong.osc2Settings.volume)
    osc2.addEffect(value.currentSong.osc2Effect)

    oscKick.addEffect(value.currentSong.kickEffect)
    oscSnare.addEffect(value.currentSong.snareEffect)
    oscHat.addEffect(value.currentSong.hatEffect)
    oscPerc.addEffect(value.currentSong.percEffect)

    Tone.Transport.scheduleRepeat((time) => { 
      repeat(time)
      repeatPoly(time)
      repeatDrums(time)
    }, '8n')
    useEffectStarted = true
  },[])

  function canEdit(){
    if (value.songUser.id !== loggedInUser) return false
    if (value.songId) return true
  }

  async function handleSave(input){
    const { songName, genre } = input
    try {
      const userId = getLoggedInUserId()
      const token = localStorage.token

      let copy = { ...value['currentSong'] }
      copy.osc1Settings = osc1.getSettings()
      copy.osc2Settings = osc2.getPolySettings()
      copy.songName = songName
      copy.genre = genre

      const { data } = await axios.post(`/api/users/${userId}/songs`, { content: copy }, { headers: { 'Authorization': `Bearer ${token}` } })

      copy = { ...value }
      const response = { ...data }
      copy.songId = response.id
      copy.songUser = response.user
      copy.currentSong = response.content
      setValue(copy)
    
    } catch (err) {
      console.log(err.response)
    }
  }

  async function handleEdit(input){
    const { songName, genre } = input
    try {
      const userId = getLoggedInUserId()
      const songId = value.songId
      const token = localStorage.token

      let copy = { ...value['currentSong'] }
      copy.osc1Settings = osc1.getSettings()
      copy.osc2Settings = osc2.getPolySettings()
      copy.songName = songName
      copy.genre = genre

      const { data } = await axios.put(`/api/users/${userId}/songs/${songId}`, { content: copy }, { headers: { 'Authorization': `Bearer ${token}` } })

      copy = { ...value }
      const response = { ...data }
      copy.songId = response.id
      copy.songUser = response.user
      copy.currentSong = response.content

      setValue(copy)
    } catch (err) {
      console.log(err.response)
    }
  }

  function handleEffectChange(event, toChange, changing){
    const change = event.target.value
    console.log(change, toChange)
    toChange.addEffect(change)
    const copy = { ...value }
    copy.currentSong[changing] = change
    setValue(copy)
  }
  
  let displayUser

  if (!getLoggedInUserId()){
    return <>
      <Navigation />
      <Container className="pageContainer">
        <div>Please login!</div>
      </Container>
    </>
  }

  if (value.songUser){
    displayUser = <div>Artist: {value.songUser.username}</div>
  } else {
    displayUser = <div>Your song</div>
  }

  const updateStep = (event, index, toUpdate) => {
    const copy = { ...value }
    copy.currentSong.drums[toUpdate][index].probability = event.target.value
    setValue(copy)
  }

  return <> 
    <Navigation />
    <Container className="pageContainer">

      <Row>

        <Col lg="5" style={{ maxWidth: '390px' }}>
          <Row>
            <Col>
              <h1>SynthKitchen</h1>
              <Row>
                <Col lg="7">
                  {displayUser}
                  <div>Title: {value.currentSong.songName}</div>
                </Col>
                <Col>
                  <Help canDisplay={helpState} display={'save'}/>
                  <SaveModal value={value} handleSave={handleSave} handleEdit={handleEdit} canEdit={canEdit}/>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col>
          <Row>
            <Col>
              <h4>Global Settings</h4>
              <Key scales={scales} value={value}/><br/>
              <Help canDisplay={helpState} display={'global'}/>
              Octave: {value.currentSong.octave} <Button className="sequencerControl" onClick={() => scales.changeOctave(-1)}>-</Button>
              <Button className="sequencerControl" onClick={() => scales.changeOctave(1)}>+</Button>
              <TempoComponent value={value} setValue={setValue}/>
            </Col>
            <Col>
              <br/>
              <Button className="sequencerControl playPause" onClick={() => startStop()}>{isPlaying ? <i className="fa fa-3x fa-pause pauseButton" aria-hidden="true"></i> : <i className="fa fa-3x fa-play playButton" aria-hidden="true"></i>}</Button>
              <Help canDisplay={helpState} display={'mute'}/>
              <Button className="sequencerControl" onClick={() => setPreviewMode(!previewMode)}>{previewMode ? 'Mute Selection' : 'Selection Muted'}</Button>
              <Button className='sequencerControl' onClick={() => setHelpState(!helpState)}>Help</Button>
              <br/>
            </Col>
          </Row>
        </Col>

      </Row>

      <Row>
        <Col lg="5" style={{ maxWidth: '390px' }}>
          <div id="drumMachine">
            <Help canDisplay={helpState} display={'drumSequencer'}/>
            <br/>
            {value.currentSong.drums.map((line, index) => {
              let count = -1
              let secondBeat = true
              return line.map((e, i) => {
                count++
                if (count === 4){
                  secondBeat = !secondBeat
                  count = 0
                }
                return <>
                  <StepNote
                    type={'drumStep'}
                    stepIndex={stepIndex}
                    step={i} val={`${index}-${i}`}
                    change={changeDrumGridByVal}
                    beat={secondBeat}
                    active={e.playNote === '-' ? false : true}/>
                </>
              })
            })}
            <br/>
            <Collapse in={kickOpen}>
              <div>
                <Probability displayText={'Kick drum'} steps={value.currentSong.grid[0]} updateStep={updateStep} toUpdate={0}/>
              </div>
            </Collapse>
            <Collapse in={snareOpen}>
              <div>
                <Probability displayText={'Snare drum'} steps={value.currentSong.grid[0]} updateStep={updateStep} toUpdate={1}/>
              </div>
            </Collapse>
            <Collapse in={hatOpen}>
              <div>
                <Probability displayText={'Hi-hat'} steps={value.currentSong.grid[0]} updateStep={updateStep} toUpdate={2}/>
              </div>
            </Collapse>
            <Collapse in={percOpen}>
              <div>
                <Probability displayText={'Percussion '} steps={value.currentSong.grid[0]} updateStep={updateStep} toUpdate={3}/>
              </div>
            </Collapse>
          </div>
        </Col>

        <Col>
          <Container className="synthSettings">
            <Row>
              <Col lg='2'></Col>
              <Col>
                <b>Volume</b>
                <Help canDisplay={helpState} display={'volume'}/>
              </Col>
              <Col lg='3'>
                <b>Effect</b>
                <Help canDisplay={helpState} display={'effect'}/>
              </Col>
              <Col><b>Edit</b></Col>
            </Row>
            <Row>
              <Col lg='2'><h5>DrumSynth</h5></Col>
              <Col><div className="volumeLabel">Kick:</div><Volume toChange={oscKick}/></Col>
              <Col lg='3'><Effect toChange={oscKick} handleEffectChange={handleEffectChange} changing={'kickEffect'}/></Col>
              <Col>
                <Help canDisplay={helpState} display={'probability'}/>
                <Button className="editButton" size="sm" onClick={() => setKickOpen(!kickOpen)} aria-controls="example-collapse-text" aria-expanded={kickOpen}>%</Button>
              </Col>
            </Row>
            <Row>
              <Col lg='2'></Col>
              <Col>
                <div className="volumeLabel">Snare:</div><Volume toChange={oscSnare}/>
              </Col>
              <Col lg='3'>
                <Effect toChange={oscSnare} handleEffectChange={handleEffectChange} changing={'snareEffect'}/></Col>
              <Col>
                <Button className="editButton" size="sm" onClick={() => setSnareOpen(!snareOpen)} aria-controls="example-collapse-text" aria-expanded={kickOpen}>%</Button>
              </Col>
            </Row>
            <Row>
              <Col lg='2'></Col>
              <Col><div className="volumeLabel">Hat:</div><Volume toChange={oscHat}/></Col>
              <Col lg='3'>
                <Effect toChange={oscHat} handleEffectChange={handleEffectChange} changing={'hatEffect'}/></Col>
              <Col>
                <Button className="editButton" size="sm" onClick={() => setHatOpen(!hatOpen)} aria-controls="example-collapse-text" aria-expanded={kickOpen}>%</Button>
              </Col>
            </Row>
            <Row>
              <Col lg='2'></Col>
              <Col><div className="volumeLabel">Perc:</div><Volume toChange={oscPerc}/></Col>
              <Col lg='3'><Effect toChange={oscPerc} handleEffectChange={handleEffectChange} changing={'percEffect'}/></Col>
              <Col>
                <Button className="editButton" size="sm" onClick={() => setPercOpen(!percOpen)} aria-controls="example-collapse-text" aria-expanded={kickOpen}>%</Button>
              </Col>
            </Row> 
            
          </Container>
        </Col>

      </Row>

      <Row>
        <Col lg="5" style={{ maxWidth: '390px' }}>
          <div id="monoSynth">
            <Help canDisplay={helpState} display={'monoSequencer'}/>
            <br/>
            {value.currentSong.grid.map((line, index) => {
              let count = -1
              let secondBeat = true
              return line.map((e, i) => {
                count++
                if (count === 4){
                  secondBeat = !secondBeat
                  count = 0
                }
                return <>
                  <StepNote
                    type={'osc1Step'}
                    stepIndex={stepIndex}
                    step={i}
                    val={`${index}-${i}`}
                    change={changeGridByVal}
                    beat={secondBeat}
                    active={e === '-' ? false : true}/>
                  </>
              })
            })}
            <br/>
            
          </div>
        </Col>

        <Col>
          <Container className="synthSettings">
            <Row>
              <Col lg='2'></Col>
              <Col><b>Properties</b><Help canDisplay={helpState} display={'ADSR'}/></Col>
              <Col><b>Type<Help canDisplay={helpState} display={'type'}/></b></Col>
            </Row>
            <Row>
              <Col lg='2'>
                <h5>MonoSynth</h5>
              </Col>
              <Col>
                <ADSR toChange={osc1} value={value} change="osc1"/>
                <br/>
                  Volume:
                <br/>
                <Volume toChange={osc1}/>
              </Col>
              <Col>
                <OscType toChange={osc1} value={value} change="osc1"/>
                <br/>
                Effect
                <br/>
                <Effect toChange={osc1} handleEffectChange={handleEffectChange} changing={'osc1Effect'}/>
                
              </Col>
            </Row> 
            
          </Container>
        </Col>

      </Row>

      <Row>
        <Col lg="5" style={{ maxWidth: '390px' }}>
          <div id="polySynth">
            <Help canDisplay={helpState} display={'polySequencer'}/>
            <br/>
            {value.currentSong.polyGrid.map((line, index) => {
              let count = -1
              let secondBeat = true
              return line.map((e, i) => {
                count++
                if (count === 4){
                  secondBeat = !secondBeat
                  count = 0
                }
                return <>
                  <StepNote
                    type={'polyStep'}
                    stepIndex={stepIndex}
                    step={i}
                    val={`${index}-${i}`}
                    change={changePolyGridByVal}
                    beat={secondBeat}
                    active={e === '-' ? false : true}/>
                  </>
              })
            })}
            <br/>
          </div>
        </Col>

        <Col>
          <Container className="synthSettings">
            <Row>
              <Col lg='2'></Col>
              <Col><b>Properties</b></Col>
              <Col><b>Type</b></Col>
            </Row>
            <Row>
              <Col lg='2'><h5>PolySynth</h5></Col>
              <Col>
                <ADSR toChange={osc2} value={value} change="osc1"/>
                <br/>
                  Volume:
                <br/>
                <Volume toChange={osc2}/>
              </Col>
              <Col>
                <OscType toChange={osc2} value={value} change="osc2"/>
                <br/>
                Effect
                <br/>
                <Effect toChange={osc2} handleEffectChange={handleEffectChange} changing={'osc2Effect'}/>
              </Col>
            </Row> 
          </Container>
        </Col>

      </Row>

    </Container>
    </>
}

export default Sequencer
