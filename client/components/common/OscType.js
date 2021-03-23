import React from 'react' 
import { Col, Row } from 'react-bootstrap'

const OscType = ({ toChange, startValue, handleSynthChange, handleOscillatorChange }) => {

  const instruments = ['AMSynth', 'FMSynth', 'MembraneSynth', 'Synth']

  return <>
    <Row>
      <Col lg="4">Instrument: </Col>
      <Col>
        <select id="synth-type" onChange={(event) => {
          handleSynthChange(event.target.value, toChange)
        }} value={startValue.synthType}>
          {instruments.map((element, index) => <option key={index} value={element}>{element}</option>)}
        </select>
      </Col>
    </Row>

    <Row>
      <Col lg="4">Oscillator: </Col>
      <Col>
        <select id="oscillator-type" onChange={(event) => {
          handleOscillatorChange(event.target.value, toChange)
        }} value={startValue.oscType}>
          <option value="triangle">Triangle</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="pulse">Pulse</option>
          <option value="sine">Sine</option>
          <option value="square">Square</option>
        </select>
      </Col>
    </Row>
  </>
}

export default OscType