import React, {useState} from 'react';
import styled from 'styled-components'
import image from '../images/family.jpg'
import logo from '../images/LogoFiles/ForWeb/medium.png'
import { Image, Button, Modal } from 'semantic-ui-react';
import Register from './user/Register';
import Login from './user/Login';
import { AuthConsumer } from '../providers/AuthProvider';
import "../styles/LandingStyles.css";

const LandingPage = (props) => {
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const toggleRegister = () => {
    setShowRegister(!showRegister)
  }
  
  const toggleLogin = () => {
    setShowLogin(!showLogin)
  }

  return (
    <>
    {props.auth.user? null :
      <div className="header-landing">
        <div className="button">
          <Modal open={showLogin} trigger={<Button id="modal-btn" onClick={() => toggleLogin()}>Sign In</Button>}>
            <Modal.Content>
              <Login toggleLogin={toggleLogin}/>
              </Modal.Content>
            </Modal>

          <Modal open={showRegister} trigger={<Button id="modal-btn" onClick={() => toggleRegister()}>Sign Up</Button>}>
            <Modal.Content>
              <Register toggleRegister={toggleRegister}/>
              </Modal.Content>
          </Modal>
        </div>
      </div> }
        
      <div className="body-landing">
        <div><Image src={logo} className="image-logo"/></div>
        <div className="intro">
          <h3>keep in touch...</h3>
          <h3>no matter where you are</h3>
        </div>
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


