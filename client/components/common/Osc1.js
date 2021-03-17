import React, { useState, useEffect } from 'react' 

const Osc1 = ({ osc1Settings, changeOsc1Type }) => {

  let { type, frequency, detune } = osc1Settings


  const [freqState, setFreqState] = useState(0)
  const [detuneState, setDetuneState] = useState(0)

  useEffect(() => {
    setFreqState(frequency)
    setDetuneState(detune)
  },[])

  function expChange(e){
    e.target.id === "frequency"
      ? setFreqState(e.target.value)
      : setDetuneState(e.target.value)
  }

  return <>
    <br /><br />
    <div className="param">
      <h3>Wave</h3>
      <button id="sine" onClick={changeOsc1Type} className={`btn btn-secondary btn-sm m-2 ${type === 'sine' && 'active'}`}>Sine</button>
      <button id="triangle" onClick={changeOsc1Type} className={`btn btn-secondary btn-sm m-2 ${type === 'triangle' && 'active'}`}>Triangle</button>
      <button id="square" onClick={changeOsc1Type} className={`btn btn-secondary btn-sm m-2 ${type === 'square' && 'active'}`}>Square</button>
      <button id="sawtooth" onClick={changeOsc1Type} className={`btn btn-secondary btn-sm m-2 ${type === 'sawtooth' && 'active'}`}>Sawtooth</button>
    </div>
    <br />


  </>
}

export default Osc1