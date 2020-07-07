import React from 'react';
import styled from 'styled-components'
import image from '../images/jump.jpg'
import { Button } from 'semantic-ui-react';

const LandingPage = () => {
    return (
   
   <ImageContent>
  <ButtonContent>
    <Button>Sign in</Button>
    <Button>Sign Out</Button>
  </ButtonContent>
  <div>
  <HeaderText> Family Talk </HeaderText>
  <br/>
  <BodyText>
    Live, Laugh, Love
  </BodyText>
  </div>
   </ImageContent>
  
    )
}

const ButtonContent = styled.div `
display: flex;
flex-flow: row wrap;
justify-content: flex-end;
width: 100%;
padding-top: 1%;
`;

const ImageContent = styled.div`
 background-image: url(${image});
 height: 100% ;
 width: 100%  ;
 margin: 0 !important;
 background-repeat: no-repeat;
 background-position: center;
 padding: 0 !important;
 background-size: cover;
 position: absolute;
 `;
const HeaderText = styled.h1`
  color: black !important;
  text-align: center;  
  padding-top: 10%;
  font-family: cursive;
  font-size: 5em;
  text-shadow: 2px 2px #dce0e0;

  `;

const BodyText = styled.p `
color: black;
text-align: center;
font-family: cursive;
font-size: 2em;
`

export default LandingPage;
