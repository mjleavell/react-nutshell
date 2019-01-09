/* eslint-disable max-len */
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import connection from '../helpers/data/connection';

import MyNavbar from '../components/MyNavbar/MyNavbar';
import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import Friends from '../components/pages/Friends/Friends';
import Articles from '../components/pages/Articles/Articles';
import Weather from '../components/pages/Weather/Weather';
import Messages from '../components/pages/Messages/Messages';
import Events from '../components/pages/Events/Events';
import './App.scss';
import authRequests from '../helpers/data/authRequests';

// stateless function
const PublicRoute = ({ component: Component, authed, ...rest }) => {
  // if we are not authenticated, we wnat to see the login component. if we are, we want to be redirect ot homepage
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  // props ends up coming from the render method within the Route
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};


class App extends React.Component {
  state = {
    authed: false,
    pendingUser: true,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        });
      } else {
        this.setState({
          authed: false,
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  // isAuthenticated = () => {
  //   this.setState({ authed: true });
  // }

  render() {
    const { authed, pendingUser } = this.state;

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (pendingUser) {
      return null;
    }

    // if (!authed) {
    //   return (
    //     <div className="App">
    //       <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
    //       <Auth isAuthenticated={this.isAuthenticated} />
    //     </div>
    //   );
    // }
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
            <div className="container">
              <div className="row">
                <Switch>
                  {/* we are exactly matching the path on the forward slash */}
                  <PrivateRoute path='/' exact component={Home} authed={authed} />
                  <PrivateRoute path='/home' component={Home} authed={authed} />
                  <PrivateRoute path='/friends' component={Friends} authed={authed} />
                  <PrivateRoute path='/articles' component={Articles} authed={authed} />
                  <PrivateRoute path='/weather' component={Weather} authed={authed} />
                  <PrivateRoute path='/events' component={Events} authed={authed} />
                  <PrivateRoute path='/messages' component={Messages} authed={authed} />
                  <PublicRoute path='/auth' component={Auth} authed={authed} />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
