import React from 'react' 

const Effect = ({ toChange, handleEffectChange, changing, startValue }) => {

  const effects = [
    'None', 'Reverb', 'Bitcrusher', 'Chorus',
    'Distortion', 'Delay', 'Ambient', 'Phaser'
  ]

  return <>
    <div className="field">
      <div className="control">
        <select id="effect-type"
          onChange={(event) => handleEffectChange(event, toChange, changing)}
          value={startValue}>
          {effects.map((element, index) => <option key={index} value={element}>{element}</option>)}
        </select>
      </div>
    </div>
  </>
}

export default Effect