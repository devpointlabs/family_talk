import React, {useState} from 'react';
import styled from 'styled-components'
import image from '../images/family.jpg'
import logo from '../images/LogoFiles/ForWeb/medium.png'
import { Image, Button, Modal } from 'semantic-ui-react';
import Register from './user/Register';
import Login from './user/Login';
import { AuthConsumer } from '../providers/AuthProvider';
import "../styles/LandingStyles.css";

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(!showModal)
  }
  
  return (
    <>
      <div className="header">
        <div className="button">
          <Modal open={showModal} trigger={<Button id="modal-btn" onClick={() => toggleModal()}>Sign In</Button>}>
            <Modal.Content>
              <Login toggleModal={toggleModal}/>
              </Modal.Content>
            </Modal>

          <Modal open={showModal} trigger={<Button id="modal-btn" onClick={() => toggleModal()}>Sign Up</Button>}>
            <Modal.Content>
              <Register toggleModal={toggleModal}/>
              </Modal.Content>
          </Modal>
        </div>
      </div>
        
      <div className="body">
        <div><Image src={logo} className="image-logo"/></div>
        <div><Image src={image} className="image-featured"/></div>
      </div>
    </>
  )
}

export default function ConnectedLandingPage (props) {
    return (
      <AuthConsumer>
        { auth => <LandingPage { ...props } auth={auth} /> }
      </AuthConsumer>
    )
  }


