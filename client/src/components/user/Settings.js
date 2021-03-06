import React, { Fragment } from 'react';
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Button, Form, Segment, Header, Grid, Divider, Container, Image, Input } from "semantic-ui-react";
import Dropzone from 'react-dropzone';
import axios from 'axios';
import './Settings.css'


const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';

class Settings extends React.Component {
  state = { editing: false, 
    formValues: { name: '', email: '', file: '', first_name: '', last_name: '' }, 
    followCode: '',
    boardId: '',
};

  componentDidMount() {
    const { auth: { user: { email, name, first_name, last_name}, }, } = this.props;
    this.setState({ formValues: { email, name, first_name, last_name}, });
  }

  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing, };
    })
  }

  onDrop = (files) => {
    this.setState({ formValues: { ...this.state.formValues, file: files[0] } });
  }

  handleChange = (e) => {
    const { name, value } = e.target; 
    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value,
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { formValues: { email, name, file, first_name, last_name } } = this.state;
    const { auth: { user, updateUser }, } = this.props;

    updateUser(user.id, {email, name, file, first_name, last_name });
    this.setState({
      editing: false,
      formValues: {
        ...this.state.formValues,
        file: "",
      },
    });
  }
  
  setBoard = (code) => {
    axios.get(`/api/user_board/board/${code}`)
    .then((res) => {
      this.setState({boardId: res.data[0].id})
  }).catch((err) => {
    console.log(err)
  })
}

  createUserBoard = () => {
    const {boardId} = this.state
    axios.post(`/api/user_boards`, {user_id: this.props.auth.user.id, board_id: boardId})
    .then((res)=>  {
      this.setState({followCode: ''})
      console.log("success")
    }).catch((err) =>  {
       console.log("failure")
    })}
 
  followSubmit = (e) => {
    const {followCode} = this.state
    this.createUserBoard()
  }

  // settingsView = () => {
  //   const { auth: { user }, } = this.props;
  //   const  {followCode} = this.state;
  //   return (
  //     <div className="fragment">
  //       <i class="user outline icon"></i>
  //       <div className="profile-icon" >My Profile <br />how your acount looks like</div>  

  //       <div className="main-content">
  //         <h2>My Family Talk Profile</h2>
  //         <img src={user.image || defaultImage} />
  //         <p>{user.name}</p>
  //         <p>{user.first_name} {user.last_name}</p>
  //         <p>{user.email}</p>
  //         <Form onSubmit={this.followSubmit}>
  //           <Form.Input
  //         label="Enter code to follow board:"
  //         name="followCode"
  //         value={followCode}
  //         onChange={(e) => this.setState({followCode: e.target.value, boardId: this.setBoard(e.target.value)})}
  //           />
  //         <Button className="hi">Follow</Button>
  //         </Form>
  //       </div>
  //     </div>
  //   )
  // }

  editView = () => {
    const { auth: { user }, } = this.props;
    const { formValues: { email, name, file, first_name, last_name }, } = this.state;
    const {followCode} = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <div className='all-info'>
         
          <div className="icon-and-dropzone">
            <div className='profile-notification'>
              <div className="profile-icon" style={{ color: 'black' }}> <i class="user icon"><br/>
                </i> My Profile  <p className='pp'>how your acount looks like</p>
              </div>  

              <div className="profile-icon2" style={{ color: 'black' }}> <i class="bell icon"><br/>
                </i> Notifications <p className='pp'>email notification and all around</p>
              </div>  
            </div>

            <div className='dropzone-only'>
              <div className='image-title'>Upload Profile Image</div>
              <Dropzone
                onDrop={this.onDrop}
                multiple={false}
              >
                {({ getRootProps, getInputProps, isDragActive }) => {
                  return (
                    <div
                      {...getRootProps()}
                      style={styles.dropzone}
                    >
                      <input {...getInputProps()} />
                      {
                        isDragActive ?
                          <p>Drop files here...</p> :
                          <p class="cloud upload icon">Click here to Upload</p>
                      }
                    </div>
                  )
                }}
                </Dropzone>
              </div>
          </div>

          <div className='profile-section'>
            <div className='title'>My Family Talk Profile</div>
              
            <div className="image-username">
              <img className="settings-image" src={user.image || defaultImage} />
                
              <Form.Input className='username'
                  label="Username"
                  name="name"
                  value={name}
                  required
                  onChange={this.handleChange}
                  />  
            </div>

            <Form.Input
                label="First Name"
                name="first_name"
                value={first_name}
                required
                onChange={this.handleChange}
            />
            
              <Form.Input
                label="Last Name"
                name="last_name"
                value={last_name}
                required
                onChange={this.handleChange}
              />
              
              <Form.Input
                label="Email"
                name="email"
                value={email}
                required
                onChange={this.handleChange}
                />
                
              <Form className="follow-form" onSubmit={this.followSubmit}>
                  <Form.Input
                  label="Enter code to follow board:"
                  name="followCode"
                  value={followCode}
                  onChange={(e) => this.setState({followCode: e.target.value, boardId: this.setBoard(e.target.value)})}
                />
                <button className='follow-button'>Follow</button>
              </Form>

              <button className='delete-button' onClick = {() => this.props.auth.destroyUser(this.props.auth.user.id, this.props.history)}>Delete</button>
              <button className='update-button'>Update</button>
            </div>
        </div>
      </Form>
    )
  }

  render() {
    const { editing, } = this.state;
    return (
    <div className="background">
      <Container>
        <Divider hidden />
        <Grid>
          <Grid.Row>
            {/* { editing ? this.editView() : this.settingsView()} */}
            {this.editView()}
            {/* <Grid.Column>
              <Button onClick={this.toggleEdit}>{editing ? 'Cancel' : 'Edit'}</Button>
            </Grid.Column> */}
          </Grid.Row>
        </Grid>
        </Container>
    </div>
    )
  }
}

const ConnectedSettings = (props) => (
  <AuthConsumer>
    { auth => 
      <Settings { ...props } auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedSettings;

const styles = {
  dropzone: {
    height: "100px",
    width: "250px",
    border: "1px dashed #E35E5D",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
}

