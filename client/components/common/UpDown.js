import React, { useState, useEffect } from 'react'

const UpDown = (props) => {

  const { sortData, sortType, arrowUp } = props
  const [clicked, setClicked] = useState('')

  useEffect(() => {
    arrowUp ? setClicked(true) : setClicked(false)
  },[])

  const click = async () => {
    await sortData(sortType)
    clicked ? setClicked(false) : setClicked(true)
  }

  return <>
    <button className="btn btn-secondary btn-sm" onClick={() => click()}>
      {clicked && <div>&#9650;</div>}
      {!clicked && <div>&#9660;</div>}
    </button>
  </>
}
 
export default UpDown