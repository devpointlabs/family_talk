import React, { Fragment, } from 'react';
import Home from './components/shared/Home';
import NoMatch from './components/routes/NoMatch';
import Navbar from './components/shared/Navbar';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { Switch, Route, } from 'react-router-dom';
import FetchUser from './components/user/FetchUser';
import ProtectedRoute from './components/routes/ProtectedRoute';
import Settings from './components/user/Settings';
import LandingPage from './components/LandingPage';
import BoardView from "./components/boards/BoardView";
import PostView from './components/boardPosts/PostView';
import AllPosts from './components/onlyPosts/AllPosts';
import PublicPage from "./components/PublicPage";

const App = () => (
  <Fragment>
    <Navbar />
    <FetchUser>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <ProtectedRoute exact path="/settings" component={Settings} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <ProtectedRoute exact path='/landingPage' component={Home} />
        <Route exact path="/board/:id" component={BoardView} />
        <Route exact path="/board/:board_id/post/:id" component={PostView} />
        <Route exact path='/posts' component={AllPosts} />
        <Route exact path='/publicPage' component={PublicPage} />
        <Route component={NoMatch} />
      </Switch>
    </FetchUser>
  </Fragment>
)

export default App;
