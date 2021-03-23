import React, { useState } from 'react' 
import { Row, Col } from 'react-bootstrap'

const ADSR = ({ toChange, settings }) => {

  const [attackState, setAttackState] = useState(settings.envelope.attack)
  const [decayState, setDecayState] = useState(settings.envelope.decay)
  const [sustainState, setSustainState] = useState(settings.envelope.sustain)
  const [releaseState, setReleaseState] = useState(settings.envelope.release)

  return <>
  <Row>
    <Col lg="3">
      Attack:
    </Col>
    <Col>
      <input
        id="envelope-attack"
        className="customSlider"
        onChange={(e) => {
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
      <input
        id="envelope-decay"
        className="customSlider"
        onChange={(event) => {
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
      <input
        id="envelope-sustain"
        className="customSlider"
        onChange={(event) => {
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
      <input
        id="envelope-release"
        className="customSlider"
        onChange={(event) => {
          toChange.updateEnvelope('release', event.target.value)
          setReleaseState(event.target.value)
        }} type="range" min="0" max="1" step="0.001" value={releaseState}/>
    </Col>
  </Row>
  </>
}

export default ADSR