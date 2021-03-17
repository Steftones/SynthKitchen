import React, { useState, useEffect } from 'react'

import { Donut } from 'react-dial-knob'

const DonutKnob = ({ input }) => {

  const [knobVal, setKnobVal] = useState(0)

  return <>
  <Donut
    diameter={50}
    min={0}
    max={100}
    step={1}
    value={knobVal}
    thickness={3}
    theme={{
      donutColor: 'RGBA(8,78,74,1)',
      donutThickness: 10
    }}
    onValueChange={(e) => setKnobVal(e)}
    ariaLabelledBy={'my-label'}
  >
    <label id={'my-label'}>Some label</label>
  </Donut>
  </>
}

export default DonutKnob