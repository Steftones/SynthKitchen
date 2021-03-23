import React from 'react'
import Navigation from './common/Navigation'
import { Container, Table, Col, Row, Tooltip, OverlayTrigger } from 'react-bootstrap'

const AboutPage = () => {

  const renderTooltip = (text) => (
    <Tooltip id="button-tooltip" >
      {text}
    </Tooltip>
  )

  const renderOverlayTrigger = (src, alt) => (
    <Col>
      <OverlayTrigger
        placement="right"
        delay={{ hide: 400 }}
        overlay={renderTooltip(alt)}
      >
        <img className="techLogo" src={src}/>
      </OverlayTrigger>
    </Col>
  )

  return <>
    <Navigation />
    <Container className="pageContainer">
      <h1>About</h1>
      <p>This web app was made by <a href="https://github.com/steftones" alt="Stefan Sokolowski Github Profile">Stefan Sokolowski</a>, an aspiring developer and music hobbyist.</p>
      <br/>
      <h4>Technologies used:</h4>
      <br/>
      <Table>
        <Row>
          {renderOverlayTrigger('https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png', 'HTML5')}
          {renderOverlayTrigger('https://cdn.eventil.com/uploads/event/logo/43/css3.png', 'CSS')}
          {renderOverlayTrigger('https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png', 'JavaScript')}
        </Row>
        <Row>
          {renderOverlayTrigger('https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/267_Python_logo-512.png', 'Python')}
          {renderOverlayTrigger('https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png', 'React')}
          {renderOverlayTrigger('https://avatars.githubusercontent.com/u/11019186?s=280&v=4', 'Tone JS')}
        </Row>
        <Row>
          {renderOverlayTrigger('https://www.secret-source.eu/wp-content/uploads/2017/11/node-js-logo.jpg', 'Node')}
          {renderOverlayTrigger('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQyFUv0RhRhnf-1LZTIwdGKRQOZjv9sUrxDKXhifbWsgaZcraCDwaTLAwiJkrM-O9FuY&usqp=CAU', 'Flask')}
          {renderOverlayTrigger('https://bitsrc.imgix.net/3fb49197a90923920dcee2f4f5c36cea2c2a1f73.png', 'React Bootstrap')}
        </Row>
      </Table>
    </Container>
  </>

}

export default AboutPage