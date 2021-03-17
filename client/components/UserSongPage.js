import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from './common/pagination.js'
import { paginate } from './common/paginate'
import _ from 'lodash'
import { getLoggedInUserId } from '../lib/auth'
import { UserContext } from '../UserContext'
import Navigation from './common/Navigation'
import { Button, Container, Row, Col, Table } from 'react-bootstrap'

const UserSongPage = ({ history }) => {

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
    const { data } = await axios.get(`/api/users/${loggedInUser}`)
    setAllData(data.songs)
  }

  async function loadUserSong(songId){
    const { data } = await axios.get(`/api/songs/${songId}`)
    const copy = { ...value }
    copy.currentSong = data.content
    copy.songUser = data.user
    copy.songId = songId
    setValue(copy)
    history.push('/try')
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

  useEffect(() => {
    fetchData()
  },[])

  const handlePageChange = (page) => {
    setCurrentPage(page)
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

  if (allData.length < 1) return <>
    <Navigation />
      <Container className="pageContainer">
        <h1>Your Songs</h1>
        <p>You currently don&apos;t have any songs saved.</p>
        <p>Time to make some! Click below to get started</p>
        <p><Button onClick={() => history.push('/try')}>Make music</Button></p>
      </Container>
  </>

  const sorted = _.orderBy(allData, [sortColumn.path], [sortColumn.order])

  const paginatedSongs = paginate(sorted, currentPage, pageSize)


  return <>
  <Navigation />
  <Container className="pageContainer">
    <Container className="tableBackground">
      <h1>Your Songs</h1>
      <p>Total songs: {!allData.length ? 0 : allData.length}</p>
      <Row>
        <Col>
          <Table>
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
                  <th><button className="btn btn-danger btn-sm" onClick={() => handleSongDelete(loggedInUser, song.id)}>Delete</button></th>
                </tr>
              </thead>))}
          
          </Table>
        </Col>
      </Row>
      <Pagination itemsCount={allData.length} pageSize={pageSize} handlePageChange={handlePageChange} currentPage={currentPage}/>
    </Container>
  </Container>
  </> 
}

export default UserSongPage