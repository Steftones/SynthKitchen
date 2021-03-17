import React from 'react'
import { Toast } from 'react-bootstrap'

const CustomToast = ({ message, show, setShow }) => {

  return <>
    <Toast className="customToast" animation={true} autohide={true} delay={3000} show={show} onClose={() => setShow(!show)}>
      <Toast.Header className="customToastHeader">
        <strong className="mr-auto">Error</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  </>

}

export default CustomToast