import React from 'react' 

const Volume = ({ toChange, handleVolumeChange, startValue }) => {

  return <>
        <input id="volume"
          className="customSlider"
          onChange={(event) => handleVolumeChange(event, toChange)}
          type="range"
          min="-30"
          max="3"
          step="0.001"
          // || 1 is to account for previous versions
          value={startValue || 1}/> 
  </>
}

export default Volume