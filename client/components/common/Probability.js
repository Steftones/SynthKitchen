import React from 'react'

const Probability = ({ displayText, steps, updateStep, toUpdate, value }) => {

  let selectValue
  if (toUpdate === 4){
    selectValue = value.currentSong.osc1
  } else if (toUpdate === 5){
    selectValue = value.currentSong.osc2
  } else {
    selectValue = value.currentSong.drums[toUpdate]
  }

  return <>
    <div>
      {displayText} probability<br/>
      {steps.map((e, index) => {
        return <select key={index} className="probSelect" onChange={(event) => updateStep(event, index, toUpdate)} value={selectValue[index].probability}>
          <option value={1}>100%</option>
          <option value={0.9}>90%</option>
          <option value={0.8}>80%</option>
          <option value={0.7}>70%</option>
          <option value={0.6}>60%</option>
          <option value={0.5}>50%</option>
          <option value={0.4}>40%</option>
          <option value={0.3}>30%</option>
          <option value={0.2}>20%</option>
          <option value={0.1}>10%</option>
        </select>
      })}
    </div>
  </>
}

export default Probability