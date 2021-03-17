import React from 'react' 

const Effect = ({ toChange, handleEffectChange, changing }) => {

  return <>
    <div className="field">
      <div className="control">
        <select id="effect-type" onChange={(event) => handleEffectChange(event, toChange, changing)}>
          <option value="None">None</option>
          <option value="Reverb">Reverb</option>
          <option value="Bitcrusher">Bitcrusher</option>
          <option value="Chorus">Chorus</option>
          <option value="Distortion">Distortion</option>
          <option value="Delay">Delay</option>
          <option value="Ambient">Ambient</option>
          <option value="Phaser">Phaser</option>
        </select>
      </div>
    </div>
  </>
}

export default Effect