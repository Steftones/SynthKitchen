import React from 'react'
import Navigation from './common/Navigation'
import { Container, Table, Col, Row } from 'react-bootstrap'

const AboutPage = () => {
  
  return <>
    <Navigation />
    <Container className="pageContainer">
      <h1>About</h1>
      <p>This web app was made by Stefan Sokolowski, an aspiring developer and music hobbyist.</p>
      <br/>
      <h4>Technologies used:</h4>
      <br/>
      <Table>
        <Row>
          <Col><img className="techLogo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png" alt="HTML5"/></Col>
          <Col><img className="techLogo" src="https://cdn.eventil.com/uploads/event/logo/43/css3.png" alt="CSS"/></Col>
          <Col><img className="techLogo" src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript"/></Col>
        </Row>
        <Row>
          <Col><img className="techLogo" src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/267_Python_logo-512.png" alt="Python"/></Col>
          <Col><img className="techLogo" src="https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png" alt="React"/></Col>
          <Col><img className="techLogo" src="https://avatars.githubusercontent.com/u/11019186?s=280&v=4" alt="Tone Js"/></Col>
        </Row>
        <Row>
          <Col><img className="techLogo" src="https://www.secret-source.eu/wp-content/uploads/2017/11/node-js-logo.jpg" alt="Node"/></Col>
          <Col><img className="techLogo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQyFUv0RhRhnf-1LZTIwdGKRQOZjv9sUrxDKXhifbWsgaZcraCDwaTLAwiJkrM-O9FuY&usqp=CAU" alt="Flask"/></Col>
          <Col><img className="techLogo" src="https://bitsrc.imgix.net/3fb49197a90923920dcee2f4f5c36cea2c2a1f73.png" alt="React Bootstrap"/></Col>
        </Row>
      </Table>
    </Container>
  </>

}

export default AboutPage