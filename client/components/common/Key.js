import React from 'react' 

const Key = ({ scales, value }) => {

  return <>
    
  <span>Key: </span>
  <select className="keySelect" onChange={(event) => {
    scales.transposeScale(event.target.value, value.currentSong.songScale)
  }}>
    <option selected value={value.currentSong.songKey}>{value.currentSong.songKey}</option>
    <option value="C">C</option>
    <option value="C#">C#</option>
    <option value="D">D</option>
    <option value="Eb">Eb</option>
    <option value="E">E</option>
    <option value="F">F</option>
    <option value="F#">F#</option>
    <option value="G">G</option>
    <option value="G#">G#</option>
    <option value="A">A</option>
    <option value="Bb">Bb</option>
    <option value="B">B</option>
  </select>

  <span> Scale: </span>
  <select className="keySelect" onChange={(event) => {
    scales.transposeScale(value.currentSong.songKey, event.target.value)
  }}>
    <option selected value={value.currentSong.songScale}>{value.currentSong.songScale}</option>
    <option value="major">Major</option>
    <option value="naturalMinor">Natural Minor</option>
    <option value="harmonicMinor">Harmonic Minor</option>
    <option value="melodicMinor">Melodic Minor</option>
    <option value="wholeTone">Whole Tone</option>
    <option value="majorPentatonic">Major Pentatonic</option>
    <option value="minorPentatonic">Minor Pentatonic</option>
    <option value="chromatic">Chromatic</option>
  </select>

  </>
}

export default Key