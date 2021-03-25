import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { getLoggedInUserId } from '../../lib/auth'
import CustomToast from './CustomToast'

const SaveModal = ({ value, handleEditSave, canEdit }) => {

  const [show, setShow] = useState(false)
  const [modalShow, setModalShow] = useState(false)

  const genres = [
    'Dance', 'Pop', 'Hip Hop', 'Drum n Bass',
    'House', 'World', 'Electro', 'Dubstep',
    'Ambient', 'Rap', 'IDM', 'Experimental', 'Other'
  ]

  const editSongButton = <button className="btn btn-secondary btn-sm m-2" onClick={() => {
    handleEditSave(formData, 'edit')
    handleClose()
  }}>Edit Song</button> 

  const [formData, updateFormData] = useState({
    songName: value.currentSong.songName,
    genre: 'Electronica'
  })

  const handleChange = (event) => {
    const name = event.target.name
    const input = event.target.value
    updateFormData({ ...formData, [name]: input })
  }

  const handleClose = () => setShow(false)
  const handleShow = () => {
    getLoggedInUserId() ? setShow(true) : setModalShow(!modalShow)
  }
  
  return <>
        <CustomToast message={'You need to be logged in to edit/save a song!'} show={modalShow} setShow={setModalShow} />
        <Button className="loadSaveButtons" variant="primary" onClick={handleShow}>
          <i className="fa fa-2x fa-floppy-o"/>
        </Button>
        <Button className="loadSaveButtons" href={`${getLoggedInUserId() ? '/usersongpage' : '/songpage'}`}><i className="fa fa-2x fa-folder-open-o"/></Button>
  
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
                  {genres.map((genre, index) => <option key={index} value={genre}>{genre}</option>)}
                </select>
              </div>
              <br />
            </form>

            <button className="btn btn-secondary btn-sm m-2" onClick={() => {
              handleEditSave(formData, 'save')
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