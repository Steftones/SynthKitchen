import React from 'react' 

const OscType = ({ toChange, value, change }) => {

  return <>
    <div className="field">
      <select id="synth-type" onChange={(event) => {
        toChange.updateSynthType(event.target.value)
      }}>
        <option selected value={
          change === 'osc1'
            ? value.currentSong.osc1Settings.synthType
            : value.currentSong.osc2Settings.synthType
        }>
          {
            change === 'osc1'
              ? value.currentSong.osc1Settings.synthType
              : value.currentSong.osc2Settings.synthType
          }
        </option>
        <option value="AMSynth">AMSynth</option>
        <option value="FMSynth">FMSynth</option>
        <option value="MembraneSynth">Membrane Synth</option>
        <option value="Synth">Synth</option>
      </select>
    </div>


    <div className="field">
      <select id="oscillator-type" onChange={(event) => {
        toChange.updateOscillatorType(event.target.value)
      }}>
        <option selected value={
          change === 'osc1'
            ? value.currentSong.osc1Settings.oscType
            : value.currentSong.osc2Settings.oscType
        }>
          {
            change === 'osc1'
              ? value.currentSong.osc1Settings.oscType
              : value.currentSong.osc2Settings.oscType
          }
        </option>
        <option value={'triangle'}>Triangle</option>
        <option value="sawtooth">Sawtooth</option>
        <option value="pulse">Pulse</option>
        <option value="sine">Sine</option>
        <option value="square">Square</option>
      </select>
    </div>
  </>
}

export default OscType