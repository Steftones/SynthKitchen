import React, { useEffect, useState } from 'react'
import { OverlayTrigger, Popover, Button } from 'react-bootstrap'

const Help = ({ canDisplay, display }) => {

  let displayText

  const sequencerText = 'This is a step sequencer that represents a pattern of notes. Each column corresponds to an 8th note in the musical sequence. Click the buttons to activate/deactivate notes.'

  if (!canDisplay) return <></>

  switch (display){
    case 'drumSequencer':
      displayText = <>{sequencerText}<br/><br/>From top to bottom, each row represents a different drum part - kick drum, snare drum, hi-hat and percussion.</>
      break
    case 'monoSequencer':
      displayText = <>{sequencerText}<br/><br/>The grid controls a monophonic synthesizer. You can activate one note per column.</>
      break
    case 'polySequencer':
      displayText = <>{sequencerText}<br/><br/>The grid controls a polyphonic synthesizer. You can activate more than one note per column.</>
      break
    case 'save':
      displayText = 'Load, save and edit songs'
      break
    case 'probability':
      displayText = 'When clicked, a grid will drop down allowing you to adjust the % chance that a note will play in the musical sequence.'
      break
    case 'mute':
      displayText = 'Toggle whether or not you want to hear a note on selection.'
      break
    case 'global':
      displayText = 'Adjust common settings for the whole project including the key, scale, octave and tempo in beats per minute.'
      break
    case 'effect':
      displayText = 'Choose between different effects that will be activated.'
      break
    case 'volume':
      displayText = 'Adjust the volume of different parts.'
      break
    case 'ADSR':
      displayText = <>Adjust the envelope of the synthesizer.<br/><br/><a href="https://en.wikipedia.org/wiki/Envelope_(music)#ADSR" rel="noreferrer" target="_blank">More detailed information here</a></>
      break
    case 'type':
      displayText = 'Choose your synthesizer and the oscillator of your chosen synthesizer.'
      break
    default:
      break
  }

  return <>
    <OverlayTrigger
      trigger="click"
      key={'bottom'}
      placement={'bottom'}
      overlay={
        <Popover id={'popover-positioned-bottom'}>
          <Popover.Content>
            {displayText}
          </Popover.Content>
        </Popover>
      }
    >
      <Button className="helpButton">?</Button>
    </OverlayTrigger>
  </>
}

export default Help