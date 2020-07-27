import React from 'react';
import { AuthConsumer,  } from "../../providers/AuthProvider";
import { Button, Form, Segment, Header, Modal} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import "../../styles/Modals.css";

class Register extends React.Component {
  state = { name: "", email: '', password: '', passwordConfirmation: '', first_name: '', last_name: '' };
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, passwordConfirmation, first_name, last_name } = this.state;
    const { auth: { handleRegister, }, history, } = this.props;

    if (password === passwordConfirmation)
      handleRegister({ name, email, password, passwordConfirmation, first_name, last_name }, history);
    else
      alert('Passwords Do Not Match!')
  }
  
  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value, });
  }

  render() {
    const { name, email, password, passwordConfirmation, first_name, last_name } = this.state;
    
    return (
      <Modal.Content 
        // id="myModal" 
        // className="modal"
        >
        <Header as='h1' 
          textAlign='center' 
          // className="modal-header"
          >Register
          </Header>
        <Form onSubmit={this.handleSubmit} 
          // className="modal-content"
          >
          <span class="close" onClick={() => this.props.toggleModal()}>&times;</span>
          <Form.Input
            label="Username"
            autoFocus
            required     
            name='name'
            value={name}
            placeholder='Username'
            onChange={this.handleChange}
          />
          <Form.Input
            label="First Name"
            required     
            name='first_name'
            value={first_name}
            placeholder='First Name'
            onChange={this.handleChange}
          />
          <Form.Input
            label="Last Name"
            required     
            name='last_name'
            value={last_name}
            placeholder='Last Name'
            onChange={this.handleChange}
          />
          <Form.Input
            label="Email"
            required
            name='email'
            value={email}
            placeholder='Email'
            onChange={this.handleChange}
          />
          <Form.Input
            label="Password"
            required
            name='password'
            value={password}
            placeholder='Password'
            type='password'
            onChange={this.handleChange}
          />
          <Form.Input
            label="Password Confirmation"
            required
            name='passwordConfirmation'
            value={passwordConfirmation}
            placeholder='Password Confirmation'
            type='password'
            onChange={this.handleChange}
          />
          <Segment textAlign='center' basic>
            <Button primary type='submit' onClick={() => this.props.toggleModal()}>Submit</Button>
          </Segment>
        </Form>
      </Modal.Content>
    )
  }
}

class ConnectedRegister extends React.Component {
  render() {
    return (
      <AuthConsumer>
        { auth => <Register { ...this.props } auth={auth} /> }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedRegister);
