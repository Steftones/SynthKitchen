import React from 'react'

const StepCondition = ({ displayText, steps, updateStepCondition, toUpdate, value }) => {

  const conditions = ['1:1', '2:2', '1:4', '2:4', '3:4', '4:4']

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
      {displayText} note condition<br/>
      {steps.map((e, index) => {
        return <select
          key={index}
          className="trigSelect"
          onChange={(event) => updateStepCondition(event, index, toUpdate)}
          value={selectValue[index].condition}>
          {conditions.map((element, index) => <option key={index} value={element}>{element}</option>)}
        </select>
      })}
    </div>
  </>
}

export default StepCondition