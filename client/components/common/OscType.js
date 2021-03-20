import React from 'react' 

const OscType = ({ toChange, startValue, handleSynthChange, handleOscillatorChange }) => {

  return <>
    <div className="field">
      <select id="synth-type" onChange={(event) => {
        handleSynthChange(event.target.value, toChange)
      }} value={startValue.synthType}>
        <option value="AMSynth">AMSynth</option>
        <option value="FMSynth">FMSynth</option>
        <option value="MembraneSynth">Membrane Synth</option>
        <option value="Synth">Synth</option>
      </select>
    </div>


    <div className="field">
      <select id="oscillator-type" onChange={(event) => {
        handleOscillatorChange(event.target.value, toChange)
      }} value={startValue.oscType}>
        <option value="triangle">Triangle</option>
        <option value="sawtooth">Sawtooth</option>
        <option value="pulse">Pulse</option>
        <option value="sine">Sine</option>
        <option value="square">Square</option>
      </select>
    </div>
  </>
}

export default OscType