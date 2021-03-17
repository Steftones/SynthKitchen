import React from 'react'
import { Button } from 'react-bootstrap'

const TempoComponent = ({ value, setValue }) => {

  const changeTempo = (val) => {
    if (value.currentSong.tempo < 60 && val < 0) return
    if (value.currentSong.tempo > 240 && val > 0) return
    const copy = { ...value }
    copy.currentSong.tempo += val
    setValue(copy)
  }

  return <>
    <span> BPM: {value.currentSong.tempo}</span>
    <Button className="sequencerControl" onClick={() => changeTempo(10)}>+</Button>
    <Button className="sequencerControl" onClick={() => changeTempo(-10)}>-</Button>
  </>
}

export default TempoComponent