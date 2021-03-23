import React from 'react' 

const Key = ({ scales, value }) => {

  const keys = [
    'C','C#','D','Eb',
    'F','F#','G','G#',
    'A','Bb','B'
  ]

  return <>
    
  <span>Key: </span>
  <select className="keySelect" onChange={(event) => {
    scales.transposeScale(event.target.value, value.currentSong.songScale)
  }} value={value.currentSong.songKey}>
    {keys.map((element, index) => <option key={index} value={element}>{element}</option>)}
  </select>

  <span> Scale: </span>
  <select className="keySelect" onChange={(event) => {
    scales.transposeScale(value.currentSong.songKey, event.target.value)
  }} value={value.currentSong.songScale}>
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