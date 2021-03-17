import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from './common/pagination.js'
import CommentModal from './common/CommentModal'
import { paginate } from './common/paginate'
import _ from 'lodash'
import { getLoggedInUserId } from '../lib/auth'
import { UserContext } from '../UserContext'
import Navigation from './common/Navigation'
import { Container, Row, Col, Table } from 'react-bootstrap'

const SongPage = ({ history }) => {

  const [allData, setAllData] = useState([])
  const [pageSize, setPageSize] = useState(4)
  const [currentPage, setCurrentPage] = useState(1) 
  const [sortColumn, setSortColumn] = useState({ path: 'content.songName', order: 'asc' })
  const [loggedInUser, setLoggedInUser] = useState(getLoggedInUserId())
  const { value, setValue } = useContext(UserContext)

  if (!getLoggedInUserId()){
    return <>
      <Navigation />
      <Container className="pageContainer">
        <div>Please login!</div>
      </Container>
    </>
  }

  async function fetchData(){
    const { data } = await axios.get('/api/songs')
    setAllData(data)
  }

  async function loadSong(songId){
    const { data } = await axios.get(`/api/songs/${songId}`)
    const copy = { ...value }
    copy.currentSong = data.content
    copy.songUser = data.user
    copy.songId = songId
    setValue(copy)
    history.push('/music')
  }

  console.log(allData, "all data")

  async function handleSaveComment(comment, songId){
    if (comment.length < 1){
      return console.log('comment not long enough')
    }
    try {
      const token = localStorage.token
      await axios.post(`/api/songs/${songId}/comments`, { content: comment }, { headers: { 'Authorization': `Bearer ${token}` } })
    } catch (err) {
      console.log(err.response)
    }
  }

  async function handleDeleteComment(songId, commentId){
    try {
      const token = localStorage.token
      await axios.delete(`/api/songs/${songId}/comments/${commentId}`, { headers: { 'Authorization' : `Bearer ${token}` } })
      fetchData()
    } catch (err) {
      console.log(err.response)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  async function handleSongDelete(userId, songId){
    try {
      const token = localStorage.token
      await axios.delete(`/api/users/${userId}/songs/${songId}`, { headers: { 'Authorization' : `Bearer ${token}` } })
      fetchData()
    } catch (err) {
      console.log(err.response)
    }
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

  const sorted = _.orderBy(allData, [sortColumn.path], [sortColumn.order])
  const paginatedSongs = paginate(sorted, currentPage, pageSize)

  return <>
  
  <Navigation />
    <Container className="songPageContainer">
      <div className="tableBackground">
        <h1>The song community</h1>
        <p>Explore over {allData.length - 1} different musical ideas and share comments.</p>
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th onClick={() => onSort('content.songName')}>Title {renderSortIcon('content.songName')}</th>
                  <th onClick={() => onSort('user.username')}>User {renderSortIcon('user.username')}</th>
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
                    <th>{song.content.songName} {song.user.id === getLoggedInUserId() && <button className="btn btn-danger btn-sm" onClick={() => handleSongDelete(loggedInUser, song.id)}>Delete</button>}</th>
                    <th>{song.user.username}</th>
                    <th>{song.content.genre}</th>
                    <th>{song.content.tempo}</th>
                    <th>{song.content.songKey}</th>
                    <th><button className="btn btn-warning btn-sm" onClick={() => loadSong(song.id)}>Load</button></th>
                    <th><CommentModal song={song} value={value} handleSaveComment={handleSaveComment} handleDeleteComment={handleDeleteComment}/></th>
                  </tr>
                </thead>))}
            </Table>
          </Col>
        </Row>
        <Pagination itemsCount={allData.length} pageSize={pageSize} handlePageChange={handlePageChange} currentPage={currentPage}/>
      </div>
    </Container>
  </> 
}

export default SongPage