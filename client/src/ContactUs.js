import React from 'react'
import './ContactUs.css'
import Javier from './images/Javier.jpg'
import shawn from './images/shawn.png'




const ContactUs = () => {

    return (
      <div>

        <div className="header">
          <h1>OUR AMAZING TEAM</h1>
        </div>
        <p style={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '6rem',
          fontStyle: 'italic',
          color:'gray'
        }}>Please feel free to reach out to us if you have an comments or questions</p>

      <div className='parent'>
        <div>
          <img className="shawn" src={shawn} alt="Shawn" />            
          <h3>Shawn Smith</h3>
          <i>Software Developer</i>
          <p>ShawnSmith@something.com</p>
        </div>

        <div>
          <img className="javier" src={Javier} alt="Javier" />
          <h3>Javier Zarate</h3>
          <i>Software Developer</i>
          <p>zarate.javier.jz@gmail.com</p>
          <a href="https://www.linkedin.com/in/javier-zarate-b01a04112/"><i class="linkedin icon"></i></a>
          <a href="https://github.com/zaratejavier"><i class="github icon"></i></a>
        </div>

          
        <div>
          <h3>Lindsay Boyden</h3>
          <p>LindsayBoyden@something.com</p>
        </div>

        <div>
          <h3>Joey DeLaCruz</h3>
          <p>Joey DeLaCruz@something.com</p>
        </div>
        
        <div>
          <h3>Kyle Dunshee</h3>
          <p>Kpdunshee@gmail.com</p>
        </div>  
      </div>

      </div>
    )
           
}


// const styles = {
//     flex: { 
//       display: "flex",
//       flexDirection: 'column',
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: 'white',
//       fontSize: '15px',
//       border: "2px solid gray",
//       backgroundColor: 'white',
    
//     },
    
//   };

export default ContactUs;
