import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { getLoggedInUserId } from '../../lib/auth'
import axios from 'axios'
import _ from 'lodash'
import Pagination from './Pagination'

const LoadModal = ({ handleLoad, value, setValue }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [allData, setAllData] = useState([])
  const [pageSize, setPageSize] = useState(4)
  const [currentPage, setCurrentPage] = useState(1) 
  const [sortColumn, setSortColumn] = useState({ path: 'content.songName', order: 'asc' })
  const [loggedInUser, setLoggedInUser] = useState(getLoggedInUserId())

  const fetchData = async () => {
    const { data } = await axios.get(`/api/users/${loggedInUser}`)
    setAllData(data.songs)
  }

  const loadUserSong = async (songId) => {
    const { data } = await axios.get(`/api/songs/${songId}`)
    const copy = { ...value }
    copy.currentSong = data.content
    setValue(copy)
  }

  useEffect(() => {
    fetchData()
  },[])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleDelete = () => {
    return null
  }

  const onSort = (path) => {
    const copy = { ...sortColumn }
    if (copy.path === path){
      copy.order = (copy.order === 'asc') ? 'desc' : 'asc'
    } else {
      copy.path = path
      copy.order = 'asc'
    }
    setSortColumn(copy)
  }

  const renderSortIcon = (column) => {
    if (column !== sortColumn.path){
      return
    }
    return sortColumn.order === 'desc'
      ? <i className="fa fa-caret-up" />
      : <i className="fa fa-caret-down" />
  }

  if (allData.length < 1) return <div>There are no songs in the database.</div>

  const sorted = _.orderBy(allData, [sortColumn.path], [sortColumn.order])

  const paginatedSongs = paginate(sorted, currentPage, pageSize)
  
  return <>
        <Button variant="primary" onClick={handleShow}>
          <i className="fa fa-2x fa-folder-open-o" aria-hidden="true"/>Load
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Load Song</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You have {!allData.length ? 0 : allData.length} songs.</p>
            <div className="row">
              <div className="col">
                <table className="table">
                  <thead>
                    <tr>
                      <th onClick={() => onSort('content.songName')}>Title {renderSortIcon('content.songName')}</th>
                      <th onClick={() => onSort('content.genre')}>Genre {renderSortIcon('content.genre')}</th>
                      <th onClick={() => onSort('content.tempo')}>BPM {renderSortIcon('content.tempo')}</th>
                      <th onClick={() => onSort('content.songKey')}>Key {renderSortIcon('content.songKey')}</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>

                  {paginatedSongs.map((song, index) => (
                    <thead key={index}>
                      <tr>
                        <th>{song.content.songName}</th>
                        <th>{song.content.genre}</th>
                        <th>{song.content.tempo}</th>
                        <th>{song.content.songKey}</th>
                        <th>{song.content.likes}</th>
                        <th><button className="btn btn-warning btn-sm" onClick={() => loadUserSong(song.id)}>Load</button></th>
                        <th><button className="btn btn-danger btn-sm" onClick={() => handleDelete(song)}>Delete</button></th>
                      </tr>
                    </thead>))}
                </table>
                <Pagination itemsCount={allData.length} pageSize={pageSize} handlePageChange={handlePageChange} currentPage={currentPage}/>
              </div>
            </div>
            <button className="btn btn-secondary btn-sm m-2" onClick={() => {
              handleLoad()
              handleClose()
            }}>Load</button> 
            <button className="btn btn-secondary btn-sm m-2" onClick={() => {
              handleClose()
            }}>Close</button>
          </Modal.Body>
        </Modal>
      </>
}

export default LoadModal