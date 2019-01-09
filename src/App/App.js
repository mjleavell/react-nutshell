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
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
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
    const { authed } = this.state;

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

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
            <div className="row">
              <Switch>
                {/* we are exactly matching the path on the forward slash */}
                <PrivateRoute path='/' exact component={Home} authed={authed} />
                <PrivateRoute path='/home' component={Home} authed={authed} />
                <PublicRoute path='/auth' component={Auth} authed={authed} />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
