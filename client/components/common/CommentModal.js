import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { getLoggedInUserId } from '../../lib/auth'

const CommentModal = ({ song, value, handleSaveComment, handleDeleteComment }) => {
  const [show, setShow] = useState(false)

  const [formData, updateFormData] = useState({
    comment: ''
  })

  const saveButton = <button className="btn btn-secondary btn-sm m-2" onClick={() => {
    handleSaveComment(formData.comment, song.id)
    handleClose()
  }}>Save</button>

  function handleChange(event){
    const name = event.target.name
    const input = event.target.value
    updateFormData({ ...formData, [name]: input })
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  
  return <>
        <button className="btn btn-warning btn-sm" onClick={() => handleShow()}>Comment</button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>Song name: {song.content.songName}</div>
            <br/>
            {song.comments.map((e) => {
              return <>
                <p>
                  <i>&quot;{e.content}&quot;</i><br/>
                  <small>User: {e.user.username}</small><br/>
                  <small>Created at: {e.created_at.substring(0,10)}</small><br/>
                  {getLoggedInUserId() === e.user.id && <Button onClick={() => handleDeleteComment(song.id, e.id)}>Delete</Button>}
                </p>
                </>
            })}
            <form>
              <div className="field">
                {song.comments.length === 0 && <><br/><br/><span>No comments have been made!</span></>}
                {song.user.id !== getLoggedInUserId() && <textarea
                  rows="4"
                  cols="50"
                  value={formData.comment}
                  onChange={handleChange}
                  name={'comment'}
                  placeholder="Write a comment!">
                </textarea>}
              </div>
              <br />
              <br />
              {song.user.id !== getLoggedInUserId() && saveButton}
              <button className="btn btn-secondary btn-sm m-2" onClick={() => {
                handleClose()
              }}>Close</button> 
            </form>
          </Modal.Body>
        </Modal>
      </>
}

export default CommentModal