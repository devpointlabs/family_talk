import React from "react";
import axios from "axios";

const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends React.Component {
  state = { user: null, userError: null };

  handleRegister = (user, history) => {
    axios.post("/api/auth", user)
      .then( res => {
        this.setState({ user: res.data.data, });
        history.push("/");
      })
    .catch( res => {
      debugger;
      console.log(res);
      this.setState({userError: res.response.data.errors})
      
    })
  }

  handleLogin = (user, history) => {
    axios.post("/api/auth/sign_in", user)
      .then( res => {
        this.setState({ user: res.data.data, });
        history.push("/landingPage");
      })
      .catch( res => {
        console.log(res);
      })
  }
  
  handleLogout = (history) => {
    axios.delete("/api/auth/sign_out")
      .then( res => {
        history.push('/');
        this.setState({ user: null, });
      })
      .catch( res => {
        console.log(res);
      })
  }

  updateUser = (id, user) => {
    let data = new FormData();
    data.append('file', user.file);
    axios.put(`/api/users/${id}?name=${user.name}&email=${user.email}&first_name=${user.first_name}&last_name=${user.last_name}`, data)
      .then( res => this.setState({ user: res.data, }) 
  
      )
  }

  destroyUser = (id, history ) => {
    history.push('/')
   axios.delete(`/api/users/${id}`)
   .then(res => {
     this.setState({ user: null, });
   })
  }
  
  render() {
    return (
      <AuthContext.Provider value={{
        ...this.state,
        authenticated: this.state.user !== null,
        handleRegister: this.handleRegister,
        handleLogin: this.handleLogin,
        handleLogout: this.handleLogout,
        setUser: (user) => this.setState({ user, }),
        updateUser: this.updateUser,
        destroyUser: this.destroyUser
      }}>
        { this.props.children }
      </AuthContext.Provider>
    )
  }
};
