import React from 'react' 

const Volume = ({ toChange }) => {

  return <>
        <input id="volume" className="customSlider" onChange={(event) => {
          const volume = event.target.value
          volume <= -30
            ? toChange.updateVolume(-Infinity)
            : toChange.updateVolume(event.target.value)
        }} type="range" min="-30" max="3" step="0.001"/>
  </>
}

export default Volume