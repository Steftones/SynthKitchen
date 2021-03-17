import React from 'react' 

const StepNote = ({ type, stepIndex, step, beat, active, change, val }) => {

  let className = `${type} `

  stepIndex === step
    ? className = className + 'stepBeat '
    : className = className + 'stepBorderActive '
  beat
    ? className = className + `${type} `
    : className = className + `${type}2 `
    
  if (active) className = className + `${type}Active `

  return <button className={`stepNote ${className}`} onClick={() => change(val)}/>
}

export default StepNote