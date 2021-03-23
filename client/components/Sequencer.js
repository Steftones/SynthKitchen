import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext'
import Navigation from './common/Navigation'
import ADSR from './common/ADSR'
import OscType from './common/OscType'
import Volume from './common/Volume'
import Key from './common/Key'
import Probability from './common/Probability'
import SaveModal from './common/SaveModal'
import StepCondition from './common/StepCondition'
import Help from './common/Help'
import Effect from './common/Effect'
import TempoComponent from './common/TempoComponent'
import StepNote from './common/StepNote'
import { getLoggedInUserId } from '../lib/auth'
import { Button, Container, Row, Col, Collapse } from 'react-bootstrap'
import axios from 'axios'
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
      // drum related synthesizers
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

  // add effects to each instrument
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
        this.effect = new Tone.FeedbackDelay('8n', 0.5).toDestination()
        break
      case 'Ambient':
        this.effect = new Tone.Reverb(30).toDestination()
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

const osc1 = new MonoInstrument()
const osc2 = new PolyInstrument()

const oscKick = new MonoInstrument()
oscKick.updateSynthType('MembraneSynth')
oscKick.updateEnvelope('attack', 0.001)
oscKick.updateEnvelope('decay', 0.5)
oscKick.updateEnvelope('sustain',0)
oscKick.updateEnvelope('release', 0.3)

const oscSnare = new MonoInstrument()
oscSnare.updateSynthType('NoiseSynth')
oscSnare.addFilter()
oscSnare.updateEnvelope('attack', 0.001)
oscSnare.updateEnvelope('decay', 0.2)
oscSnare.updateEnvelope('sustain',0.008)
oscSnare.updateEnvelope('release', 0.03)

const oscHat = new MonoInstrument()
oscHat.updateSynthType('NoiseSynth')
oscHat.addFilter()
oscHat.updateEnvelope('attack', 0)
oscHat.updateEnvelope('decay', 0.05)
oscHat.updateEnvelope('sustain',0.0005)
oscHat.updateEnvelope('release', 0.007)

const oscPerc = new MonoInstrument() 
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
  const [osc1Open, setOsc1Open] = useState(false) 
  const [osc2Open, setOsc2Open] = useState(false) 
  const [kickConditionOpen, setKickConditionOpen] = useState(false) 
  const [snareConditionOpen, setSnareConditionOpen] = useState(false) 
  const [percConditionOpen, setPercConditionOpen] = useState(false)
  const [hatConditionOpen, setHatConditionOpen] = useState(false) 
  const [osc1ConditionOpen, setOsc1ConditionOpen] = useState(false) 
  const [osc2ConditionOpen, setOsc2ConditionOpen] = useState(false) 
  

  if (!getLoggedInUserId()){
    return <>
      <Navigation />
      <Container className="pageContainer">
        <div>Please login!</div>
      </Container>
    </>
  }

  const changeDrumGridByVal = (val) => {
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
            oscKick.play('C1','8n') // default value
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
            console.log('error with drum playback')
        }
      } 
    }
  }

  const changePolyGridByVal = (val) => {
    const note = val[0]
    const step = val.substring(2)
    const copy = { ...value }
    if (copy.currentSong.polyGrid[note][step] !== '-'){ // if the note is present
      copy.currentSong.polyGrid[note][step] = '-'
      const newNotes = copy.currentSong.osc2[step].playNote.filter(e => e !== note)
      copy.currentSong.osc2[step].playNote = newNotes
      setValue(copy)
    } else {
      copy.currentSong.polyGrid[note][step] = note
      copy.currentSong.osc2[step].playNote.push(note)
      setValue(copy)
      if (previewMode) osc2.play(value.currentSong.notes[note], '8n')
    }
  }

  const changeGridByVal = (val) => {
    const note = val[0]
    const step = val.substring(2)
    const copy = { ...value }
    if (copy.currentSong.grid[note][step] !== '-'){
      copy.currentSong.grid[note][step] = '-'
      copy.currentSong.osc1[step].playNote = '-'
      setValue(copy)
    } else {
      for (let i = 0; i < copy.currentSong.grid.length; i++){
        if (copy.currentSong.grid[i][step] !== '-') {
          copy.currentSong.grid[i][step] = '-'
          copy.currentSong.osc1[step].playNote = '-'
          setValue(copy)
        }
      }
      copy.currentSong.grid[note][step] = note
      copy.currentSong.osc1[step].playNote = note
      setValue(copy)
      if (previewMode){
        osc1.play(value.currentSong.notes[note], '8n')
      }
    }
  }

  const [isPlaying, setIsPlaying] = useState(false)
  const startStop = () => {
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

  // init bpm
  Tone.Transport.bpm.value = value.currentSong.tempo

  let index = 0
  let round = 1

  const incrementLoop = (index) => {
    if (index === 0) return 1
    if (index % 16 === 0) round++
    if (round === 5) round = 1
  }

  // checks for step conditions
  const checkStepCondition = (condition, round) => {
    switch (condition){
      case '1:1':
        return true
      case '2:2':
        return round % 2 === 0 ? true : false
      default:
        return round === parseInt(condition[0]) ? true : false
    }
  }

  // osc1 repeat
  const repeat = (time) => {
    const position = index % value.currentSong.osc1.length
    const synthNote = value.currentSong.osc1[position]

    // increment the sequence loop count
    incrementLoop(index)

    if (
      synthNote.playNote !== '-' &&
      Math.random() <= synthNote.probability &&
      checkStepCondition(synthNote.condition, round)
    ) osc1.play(value.currentSong.notes[synthNote.playNote], '8n', time)
    index++
  }

  // poly synth repeat
  let indexPoly = 0
  const repeatPoly = (time) => {
    const position = indexPoly % value.currentSong.osc2.length
    const polyNote = value.currentSong.osc2[position]
    if (
      polyNote.playNote.length !== 0 &&
      Math.random() <= polyNote.probability
    ){
      const playNotesInScale = []
      polyNote.playNote.forEach((n) => {
        playNotesInScale.push(value.currentSong.notes[n])
      })
      osc2.play(playNotesInScale, '8n', time)
    }
    indexPoly++
  }

  // drums repeat
  let indexDrums = 0
  const repeatDrums = (time) => {
    const position = indexDrums % value.currentSong.drums[0].length
    setStepIndex(indexDrums % value.currentSong.osc1.length) // setting the step index
    const kick = value.currentSong.drums[0][position]
    const snare = value.currentSong.drums[1][position]
    const hat = value.currentSong.drums[2][position]
    const perc = value.currentSong.drums[3][position]
    if (
      kick.playNote !== '-' &&
      Math.random() <= kick.probability &&
      checkStepCondition(kick.condition, round)
    ){
      oscKick.play(kick.playNote,'8n', time)
    }
    if (
      snare.playNote !== '-' &&
      Math.random() <= snare.probability &&
      checkStepCondition(snare.condition, round)
    ){
      oscSnare.play(null, '8n', time)
    }
    if (
      hat.playNote !== '-' &&
      Math.random() <= hat.probability
      && checkStepCondition(hat.condition, round)
    ){
      oscHat.play(null, '8n', time)
    }
    if (
      perc.playNote !== '-' &&
      Math.random() <= perc.probability &&
      checkStepCondition(perc.condition, round)
    ){
      oscPerc.play(perc.playNote, '8n', time) 
    } 
    indexDrums++
  }

  useEffect(() => {
    setIsPlaying(false)

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
    oscKick.updateVolume(value.currentSong.kickVolume)
    oscSnare.addEffect(value.currentSong.snareEffect)
    oscSnare.updateVolume(value.currentSong.snareVolume)
    oscHat.addEffect(value.currentSong.hatEffect)
    oscHat.updateVolume(value.currentSong.hatVolume)
    oscPerc.addEffect(value.currentSong.percEffect)
    oscPerc.updateVolume(value.currentSong.percVolume)

    Tone.Transport.scheduleRepeat((time) => { 
      repeat(time)
      repeatPoly(time)
      repeatDrums(time)
    }, '8n')

  },[])

  const canEdit = () => {
    if (value.songUser.id !== loggedInUser) return false
    if (value.songId) return true
  }

  const handleEditSave = async (input, editOrSave) => {
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

      let data

      if (editOrSave === 'edit'){
        await axios.put(`/api/users/${userId}/songs/${songId}`, { content: copy }, { headers: { 'Authorization': `Bearer ${token}` } })
          .then(response => data = response.data)
      } else {
        await axios.post(`/api/users/${userId}/songs`, { content: copy }, { headers: { 'Authorization': `Bearer ${token}` } })
          .then(response => data = response.data)
      }

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

  const handleEffectChange = (event, toChange, changing) => {
    const change = event.target.value
    console.log(change, toChange)
    toChange.addEffect(change)
    const copy = { ...value }
    copy.currentSong[changing] = change
    setValue(copy)
  }

  const handleSynthChange = (event, toChange) => {
    toChange.updateSynthType(event)
    const copy = { ...value }
    toChange === osc1
      ? copy.currentSong.osc1Settings.synthType = event
      : copy.currentSong.osc2Settings.synthType = event
    setValue(copy)
  }

  const handleOscillatorChange = (event, toChange) => {
    toChange.updateOscillatorType(event)
    const copy = { ...value }
    toChange === osc1
      ? copy.currentSong.osc1Settings.oscType = event
      : copy.currentSong.osc2Settings.oscType = event
    setValue(copy)
  }

  const handleVolumeChange = (event, toChange) => {
    const volume = event.target.value
    volume <= -30
      ? toChange.updateVolume(-Infinity)
      : toChange.updateVolume(event.target.value)
    const copy = { ...value }
    switch (toChange){
      case osc1:
        copy.currentSong.osc1Settings.volume = volume
        break
      case osc2:
        copy.currentSong.osc2Settings.volume = volume
        break
      case oscKick:
        copy.currentSong.kickVolume = volume
        break
      case oscSnare:
        copy.currentSong.snareVolume = volume
        break
      case oscHat:
        copy.currentSong.hatVolume = volume
        break
      case oscPerc:
        copy.currentSong.percVolume = volume
        break
      default:
        alert('volume handling error')
        break
    }
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
    if (toUpdate === 4){
      copy.currentSong.osc1[index].probability = event.target.value
    } else if (toUpdate === 5){
      copy.currentSong.osc2[index].probability = event.target.value
    } else {
      copy.currentSong.drums[toUpdate][index].probability = event.target.value
    }
    setValue(copy)
  }

  const updateStepCondition = (event, index, toUpdate) => {
    const copy = { ...value }
    if (toUpdate === 4){
      copy.currentSong.osc1[index].condition = event.target.value
    } else if (toUpdate === 5){
      copy.currentSong.osc2[index].condition = event.target.value
    } else {
      copy.currentSong.drums[toUpdate][index].condition = event.target.value
    }
    setValue(copy)
  }

  const stepSequencer = (type, toMap, change) => (
    toMap.map((line, index) => {
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
            type={type}
            stepIndex={stepIndex}
            step={i}
            val={`${index}-${i}`}
            change={change}
            beat={secondBeat}
            active={
              (type === 'drumStep' ? e.playNote : e) === '-' ? false : true
            }/>
        </>
      })
    }
    )
  )

  const collapsedOptions = (optionState, conditionState, displayText, update) => (
    <>
      <Collapse in={optionState}>
        <div>
          <Probability
            displayText={displayText}
            steps={value.currentSong.grid[0]}
            updateStep={updateStep}
            toUpdate={update}
            value={value}/>
        </div>
      </Collapse>
      <Collapse in={conditionState}>
        <div>
          <StepCondition
            displayText={displayText}
            steps={value.currentSong.grid[0]}
            updateStepCondition={updateStepCondition}
            toUpdate={update}
            value={value}/>
        </div>
      </Collapse>
    </>
  )

  const displayOsc = (display, toChange, settings, effectSettings, open, setOpen, conditionOpen, setConditionOpen) => (
    <Row>
      <Col lg='2'>
        <h5>{display}</h5>
      </Col>
      <Col>
        <ADSR
          toChange={toChange}
          settings={settings}/>
        <Row>
          <Col lg="3">
            <br/>
            Volume: 
          </Col>
          <Col>
            <br/>
            <Volume
              toChange={toChange}
              handleVolumeChange={handleVolumeChange}
              startValue={settings.volume}/>
            <br/>
            <br/>
          </Col>
        </Row>
      </Col>
      <Col>
        <OscType
          toChange={toChange}
          startValue={settings}
          handleSynthChange={handleSynthChange}
          handleOscillatorChange={handleOscillatorChange}/>
        <Row>
          <Col lg="4">Effect: </Col>
          <Col>
            <Effect
              toChange={toChange}
              handleEffectChange={handleEffectChange}
              changing={'osc1Effect'}
              startValue={effectSettings}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              className={`editButton ${open ? 'active' : ''}`}
              size="sm" onClick={() => setOpen(!open)}
              aria-expanded={open}>%</Button>
            &nbsp;
            <Button
              className={`editButton ${conditionOpen ? 'active' : ''}`}
              size="sm"
              onClick={() => setConditionOpen(!conditionOpen)}
              aria-expanded={open}>A:B</Button>
          </Col>
        </Row>
      </Col>
    </Row> 
  )

  const displayDrumSettings = (label, change, volume, effect, effectChanging, open, setOpen, condition, setCondition ) => (
    <>
      <Col>
        <div className="volumeLabel">{label}</div>
        <Volume
          toChange={change}
          handleVolumeChange={handleVolumeChange}
          startValue={volume}/>
      </Col>
      <Col lg='3'>
        <Effect
          toChange={change}
          handleEffectChange={handleEffectChange}
          changing={effectChanging}
          startValue={effect}/></Col>
      <Col>
        <Button
          className={`editButton ${open ? 'active' : ''}`}
          size="sm"
          onClick={() => setOpen(!open)}
          aria-expanded={open}>%</Button>
        &nbsp;
        <Button
          className={`editButton ${condition ? 'active' : ''}`}
          size="sm"
          onClick={() => setCondition(!condition)}
          aria-expanded={open}>A:B</Button>
      </Col>
    </>
  )

  return <> 
    <Navigation />
    <Container className="pageContainer">

      <Row>
        <Col/>
        <Col><h1 className="sequencerTitle">SynthKitchen</h1></Col>
        <Col/>
      </Row>

      <Row>
        <Col className="sequencerContainer">
          <Button
            className="sequencerControl playPause"
            onClick={() => startStop()}>
            {isPlaying ? <i className="fa fa-3x fa-pause pauseButton" aria-hidden="true"></i> : <i className="fa fa-3x fa-play playButton" aria-hidden="true"></i>}
          </Button>
          <Help canDisplay={helpState} display={'mute'}/>
          <Button
            className="sequencerControl"
            onClick={() => setPreviewMode(!previewMode)}>
            {previewMode ? 'Mute Selection' : 'Selection Muted'}
          </Button>
          <Button
            className={`sequencerControl ${helpState ? 'active' : null}`}
            onClick={() => setHelpState(!helpState)}>Help</Button>
        </Col>
        <Col className="sequencerContainer">
          <h4>Global Settings</h4>
          <Key scales={scales} value={value}/><br/>
          <Help canDisplay={helpState} display={'global'}/>
          Octave: {value.currentSong.octave}
          <Button
            className="sequencerControl"
            onClick={() => scales.changeOctave(-1)}>-</Button>
          <Button
            className="sequencerControl"
            onClick={() => scales.changeOctave(1)}>+</Button>
          <TempoComponent value={value} setValue={setValue}/>
        </Col>
        <Col className="sequencerContainer">
          <br/>
          <Row>
            <Col lg="6">
              {displayUser}
              <div>Title: {value.currentSong.songName}</div>
            </Col>
            <Col >
              <Help canDisplay={helpState} display={'save'}/>
              <SaveModal
                value={value}
                handleEditSave={handleEditSave}
                canEdit={canEdit}/>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col className="stepSequencer">
          <div id="drumMachine">
            <Help canDisplay={helpState} display={'drumSequencer'}/>
            <br/>
            {stepSequencer('drumStep', value.currentSong.drums, changeDrumGridByVal)}
            <br/>
            {collapsedOptions(kickOpen, kickConditionOpen, 'Kick drum', 0)}
            {collapsedOptions(snareOpen, snareConditionOpen, 'Snare drum', 1)}
            {collapsedOptions(hatOpen, hatConditionOpen, 'Hi-hat', 2)}
            {collapsedOptions(percOpen, percConditionOpen, 'Percussion', 3)}
          </div>
        </Col>
        <Col lg='8' >
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
              <Col>
                <b>Edit</b>
                <Help canDisplay={helpState} display={'probabilityAndConditions'}/>
              </Col>
            </Row>
            <Row>
              <Col lg='2'><h5>DrumSynth</h5></Col>
              {displayDrumSettings('Kick:', oscKick, value.currentSong.kickVolume, value.currentSong.kickEffect, 'kickEffect', kickOpen, setKickOpen, kickConditionOpen, setKickConditionOpen)}
            </Row>
            <Row>
              <Col lg='2'></Col>
              {displayDrumSettings('Snare:', oscSnare, value.currentSong.snareVolume, value.currentSong.snareEffect, 'snareEffect', snareOpen, setSnareOpen, snareConditionOpen, setSnareConditionOpen)}
            </Row>
            <Row>
              <Col lg='2'></Col>
              {displayDrumSettings('Hat:', oscHat, value.currentSong.hatVolume, value.currentSong.hatEffect, 'hatEffect', hatOpen, setHatOpen, hatConditionOpen, setHatConditionOpen)}
            </Row>
            <Row>
              <Col lg='2'></Col>
              {displayDrumSettings('Perc:', oscPerc, value.currentSong.percVolume, value.currentSong.percEffect, 'percEffect', percOpen, setPercOpen, percConditionOpen, setPercConditionOpen)}
            </Row> 
          </Container>
        </Col>
      </Row>

      <Row>
        <Col className="stepSequencer">
          <div id="monoSynth">
            <Help canDisplay={helpState} display={'monoSequencer'}/>
            {stepSequencer('osc1Step', value.currentSong.grid, changeGridByVal)}
            <br/>
            {collapsedOptions(osc1Open, osc1ConditionOpen, 'MonoSynth', 4)}
          </div>
        </Col>
        <Col lg="8">
          <Container className="synthSettings">
            <Row>
              <Col lg='2'></Col>
              <Col><b>Properties</b><Help canDisplay={helpState} display={'ADSR'}/></Col>
              <Col><b>Edit<Help canDisplay={helpState} display={'type'}/></b></Col>
            </Row>
            {displayOsc('MonoSynth', osc1, value.currentSong.osc1Settings, value.currentSong.osc1Effect, osc1Open, setOsc1Open, osc1ConditionOpen, setOsc1ConditionOpen)}
          </Container>
        </Col>
      </Row>

      <Row>
        <Col className="stepSequencer">
          <div id="polySynth">
            <Help canDisplay={helpState} display={'polySequencer'}/>
            {stepSequencer('polyStep', value.currentSong.polyGrid, changePolyGridByVal)}
            <br/>
            {collapsedOptions(osc2Open, osc2ConditionOpen, 'PolySynth', 5)}
          </div>
        </Col>
        <Col lg="8">
          <Container className="synthSettings">
            <Row>
              <Col lg='2'></Col>
              <Col><b>Properties</b></Col>
              <Col><b>Edit</b></Col>
            </Row>
            {displayOsc('PolySynth', osc2, value.currentSong.osc2Settings, value.currentSong.osc2Effect, osc2Open, setOsc2Open, osc2ConditionOpen, setOsc2ConditionOpen)}
          </Container>
        </Col>
      </Row>

      <Row>
        <Col className="sequencerBottom"></Col>
      </Row>

    </Container>
    </>
}

export default Sequencer
