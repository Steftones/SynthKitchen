import React from 'react'
import { OverlayTrigger, Popover, Button } from 'react-bootstrap'

const Help = ({ canDisplay, display }) => {

  let displayText

  const sequencerText = 'The step sequencer represents a pattern of notes. Each column corresponds to an 8th note in the musical sequence. Click the buttons to activate/deactivate notes.'

  if (!canDisplay) return <></>

  switch (display){
    case 'drumSequencer':
      displayText = <>
        {sequencerText}<br/><br/>
        From top to bottom, each row represents a different drum part - kick drum, snare drum, hi hat and percussion.
      </>
      break
    case 'monoSequencer':
      displayText = <>
        {sequencerText}<br/><br/>
        The grid controls a monophonic synthesizer. You can activate one note per column.
      </>
      break
    case 'polySequencer':
      displayText = <>
        {sequencerText}<br/><br/>
        The grid controls a polyphonic synthesizer. You can activate more than one note per column.
      </>
      break
    case 'save':
      displayText = 'Load, save and edit songs'
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
      displayText = <>
        Adjust the envelope of the synthesizer.<br/><br/>
        <a href="https://en.wikipedia.org/wiki/Envelope_(music)#ADSR" rel="noreferrer" target="_blank">More detailed information here</a>
      </>
      break
    case 'type':
      displayText = 'Choose your synthesizer and the oscillator of your chosen synthesizer.'
      break
    case 'probabilityAndConditions':
      displayText = <>
        <h5>%</h5>
        Adjust the % chance that a note will play.
        <br/><br/>
        <h5>A:B</h5>
        The musical sequence will loop continuously. Adjust when a note is active.<br/>
        <br/><br/>
        E.g.<br/>
        <ul>
          <li>1:1 - the note is active on every loop.</li>
          <li>2:2 - the note is active on loops 2, 4, 6 and so on.</li>
          <li>3:4 - the note is active on loops 3, 7, 11 and so on.</li>
        </ul>
      </>
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