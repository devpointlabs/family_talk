import React from 'react'
import styled from 'styled-components'

const ContactUs = () => {

    return (
        <div style={styles.flex}>
            <h1 stlye ={styles.header}>Contact Us</h1>
            <p>Please feel free to reach out to us if you have an comments or questions</p>
            <h3>Shawn Smith</h3>
            <p>ShawnSmith@something.com</p>
            <h3>Javier Zarate</h3>
            <p>JavierZarate@something.com</p>
            <h3>Lindsay Boyden</h3>
            <p>lindsayboyden@yahoo.com</p>
            <h3>Joey DeLaCruz</h3>
            <p>Joey DeLaCruz@something.com</p>
            <h3>Kyle Dunshee</h3>
            <p>Kpdunshee@gmail.com</p>
        </div>
    )
           
}



const styles = {
    flex: { 
      display: "flex",
      flexDirection: 'column',
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'white',
      fontSize: '15px',
      border: "2px solid gray",
      backgroundColor: 'white',
    
    },
    
  };

export default ContactUs;