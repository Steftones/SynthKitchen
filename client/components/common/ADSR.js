import React, { useEffect, useState } from 'react' 
import { Row, Col } from 'react-bootstrap'

const ADSR = ({ toChange, value, change }) => {

  const [attackState, setAttackState] = useState(undefined)
  const [decayState, setDecayState] = useState(undefined)
  const [sustainState, setSustainState] = useState(undefined)
  const [releaseState, setReleaseState] = useState(undefined)

  useEffect(() => {
    if (change === 'osc1'){
      setAttackState(value.currentSong.osc1Settings.envelope.attack)
      setDecayState(value.currentSong.osc1Settings.envelope.decay)
      setSustainState(value.currentSong.osc1Settings.envelope.sustain)
      setReleaseState(value.currentSong.osc1Settings.envelope.release)
    } else {
      setAttackState(value.currentSong.osc2Settings.envelope.attack)
      setDecayState(value.currentSong.osc2Settings.envelope.decay)
      setSustainState(value.currentSong.osc2Settings.envelope.sustain)
      setReleaseState(value.currentSong.osc2Settings.envelope.release)
    }
  },[])

  return <>
  <Row>
    <Col lg="3">
      Attack:
    </Col>
    <Col>
      <input id="envelope-attack" className="customSlider" onChange={(e) => {
        toChange.updateEnvelope('attack', e.target.value)
        setAttackState(e.target.value)
      }} type="range" min="0" max="1" step="0.001" value={attackState}/>
    </Col>
  </Row>
  <Row>
    <Col lg="3">
      Decay:
    </Col>
    <Col>
      <input id="envelope-decay" className="customSlider" onChange={(event) => {
        toChange.updateEnvelope('decay', event.target.value)
        setDecayState(event.target.value)
      }} type="range" min="0" max="3" step="0.001" value={decayState}/>
    </Col>
  </Row>
  <Row>
    <Col lg="3">
      Sustain:
    </Col>
    <Col>
      <input id="envelope-sustain" className="customSlider" onChange={(event) => {
        toChange.updateEnvelope('sustain', event.target.value)
        setSustainState(event.target.value)
      }} type="range" min="0" max="1" step="0.001" value={sustainState}/>
    </Col>
  </Row>
  <Row>
    <Col lg="3">
      Release: 
    </Col>
    <Col>
      <input id="envelope-release" className="customSlider" onChange={(event) => {
        toChange.updateEnvelope('release', event.target.value)
        setReleaseState(event.target.value)
      }} type="range" min="0" max="1" step="0.001" value={releaseState}/>
    </Col>
  </Row>
  </>
}

export default ADSR