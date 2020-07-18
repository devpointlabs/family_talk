import React from 'react'
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Menu, Dropdown, } from 'semantic-ui-react'
import { Link, withRouter, } from 'react-router-dom'

class Navbar extends React.Component {
  
  rightNavItems = () => {
    const { auth: { user, handleLogout, }, location, } = this.props;
    
    if (user) {
      return (
          <Dropdown text = 'User' icon = 'user'>
        <Dropdown.Menu>
            <Dropdown.Item as ={Link} to= '/settings'>Settings</Dropdown.Item>
            <Dropdown.Item onClick = {() => handleLogout(this.props.history)}>Logout</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>    
      )
    } else {
      return (
        <Dropdown text = 'Login' icon = 'login'>
          <Dropdown.Menu>
          <Dropdown.Item as = {Link} to ='/login'>Login</Dropdown.Item>
          <Dropdown.Item as = {Link} to = '/register'>Register</Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>
     )
    }
   }

  render() {
    return( 
      <div>
  <Dropdown>
    <Dropdown.Menu>
      <Dropdown.Item as={Link} to='/'>Home</Dropdown.Item>
      <Dropdown.Item as ={Link} to='/landingPage'>Landing Page</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  {this.rightNavItems()}
  </div>
  )} 
}

export class ConnectedNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer> 
        { auth => 
          <Navbar { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedNavbar);