import React from 'react'
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Menu, Dropdown, } from 'semantic-ui-react'
import { Link, withRouter, } from 'react-router-dom'

class Navbar extends React.Component {
  
  rightNavItems = () => {
    const { auth: { user, handleLogout, }, location, } = this.props;
    
    if (user) {
      return (
        <Menu.Menu position='right'>
          
          <Link to='/settings'>
            <Menu.Item 
              id='settings'
              name='settings'
              active={location.pathname === '/settings'}
            />
          </Link>
          <Menu.Item
            name='logout'
            onClick={ () => handleLogout(this.props.history) }
          />
        </Menu.Menu>
      )
    } else {
      return (
        <Menu.Menu position='right'>
          <Link to='/login'>
            <Menu.Item
              id='Sign In'
              name='Sign In'
              active={location.pathname === '/login'}
            />
          </Link>
          <Link to='/register'>
            <Menu.Item
              id='register'
              name='Sign Up'
              active={location.pathname === '/register'}
            />
          </Link>
        </Menu.Menu>
      )
    }
  }

// render() {
//   return( 
//     <div>
// <Dropdown >
//   <Dropdown.Menu>
//     <Dropdown.Item as={Link} to='/'>Home</Dropdown.Item>
//     <Dropdown.Item as={Link} to='/landingPage'>Landing Page</Dropdown.Item>
//   </Dropdown.Menu>
// </Dropdown>

// {this.rightNavItems()}
// </div>
// )}
  render() {
    return (
      <div>
        <Menu pointing secondary>
          <Link to='/'>
            <Menu.Item
              name='home'
              id='home'
              active={this.props.location.pathname === '/'}
            />
            
          </Link>
          <Link to='/landingPage'>
            <Menu.Item
              name='landingPage'
              id='landingPage'
              active={this.props.location.pathname === '/landingPage'}
            />
          </Link>
            { this.rightNavItems() }
        </Menu>
      </div>
    )
  }
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