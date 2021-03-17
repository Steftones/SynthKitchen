import React from 'react' 

const Filter = ({ changeFilter, filterSettings, changeFilterType }) => {

  const { frequency, Q, gain, type } = filterSettings

  return <>
    <div className="control">

      <div className="params">
        Freq:
        <input value={frequency} className="customSlider" type="range" onChange={changeFilter} id="frequency" max="10000" />
        <input value={Q} className="customSlider" type="range" onChange={changeFilter} id="Q" max="10" step="0.1"/>
        <input value={gain} className="customSlider" type="range" onChange={changeFilter} id="gain" max="10" step="0.1"/>
      </div>

      <div className="param">
        Type:
        <button onClick={changeFilterType} id="lowpass" className={`btn btn-secondary btn-sm m-2 ${type === 'lowpass' && 'active'}`}>lowpass</button>
        <button onClick={changeFilterType} id="highpass" className={`btn btn-secondary btn-sm m-2 ${type === 'highpass' && 'active'}`}>highpass</button>
      </div>

    </div>

  </>
}

export default Filter