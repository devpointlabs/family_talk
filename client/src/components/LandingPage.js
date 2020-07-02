import React from 'react';
import styled from 'styled-components'

const LandingPage = () => (
    <>
    <LandingContainer>

  <HeaderText> Family Talk</HeaderText>
  <imageContainer>
    <img text-align="centet"src= 'https://www.pngkit.com/png/detail/59-595524_family-tree-clipart-family-tree-no-background.png'></img>
    </imageContainer>
  </LandingContainer>
  </>
)


const LandingContainer = styled.div`
background: linear-gradient(to bottom right, blue, white);
`;
const HeaderText = styled.h1`
  color: white !important;
  text-align: center;
  
`;

export default LandingPage;