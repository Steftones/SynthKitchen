import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const SaveModal = ({ handleSave, handleEdit, value, canEdit }) => {
  const [show, setShow] = useState(false)

  const editSongButton = <button className="btn btn-secondary btn-sm m-2" onClick={() => {
    handleEdit(formData)
    handleClose()
  }}>Edit Song</button> 

  const [formData, updateFormData] = useState({
    songName: value.currentSong.songName,
    genre: 'Electronica'
  })

  function handleChange(event){
    const name = event.target.name
    const input = event.target.value
    updateFormData({ ...formData, [name]: input })
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  
  return <>
        <Button className="loadSaveButtons" variant="primary" onClick={handleShow}>
          <i className="fa fa-2x fa-floppy-o"/>
        </Button>
        <Button className="loadSaveButtons" href="/usersongpage"><i className="fa fa-2x fa-folder-open-o"/></Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Save changes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="field">
                Name: 
                <input
                  type="text"
                  value={formData.songName}
                  onChange={handleChange}
                  placeholder={'Enter song name'}
                  name={'songName'}
                  maxLength="25"
                /> 
              </div>
              <br />
              <div className="field">
                Genre:
                <select id="key-type" onChange={handleChange} name={'genre'}>
                  <option value="Electronica">Electronica</option>
                  <option value="Dance">Dance</option>
                  <option value="Pop">Pop</option>
                  <option value="Hip Hop">Hip Hop</option>
                  <option value="Drum n Bass">Drum n Bass</option>
                  <option value="House">House</option>
                  <option value="World">World</option>
                  <option value="Electro">Electro</option>
                  <option value="Dubstep">Dubstep</option>
                  <option value="Ambient">Ambient</option>
                  <option value="Rap">Rap</option>
                  <option value="IDM">IDM</option>
                  <option value="Experimental">Experimental</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <br />
            </form>

            <button className="btn btn-secondary btn-sm m-2" onClick={() => {
              handleSave(formData)
              handleClose()
            }}>Save New</button> 

            {canEdit() && editSongButton}

            <button className="btn btn-secondary btn-sm m-2" onClick={() => {
              handleClose()
            }}>Close</button> 
            
          </Modal.Body>
        </Modal>
      </>
}

export default SaveModal