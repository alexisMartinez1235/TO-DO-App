import React from 'react';
import {
  // BrowserRouter as Router,
  // Switch,
  Route,
  Routes,
} from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Pricing from './Pricing';
import Auth from './Auth';
import NotFound from './NotFound';
import NoAuth from './NoAuth';

/* <a href="https://www.flaticon.com/free-icons/plan" title="plan icons">Plan icons created by Freepik - Flaticon (favicon.ico)</a> */

interface IProps {
  history: any;
}

interface IState {
  isLogged: boolean;
}

class ControlSign extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLogged: false,
    };
    // this.props.history.push('/signin', { state: 'simple data' });
    // this.props.history.push('/signin');
    this.onSignChange = this.onSignChange.bind(this);
    this.onSign = this.onSign.bind(this);
    this.updatePath = this.updatePath.bind(this);
  }

  onSignChange(value: boolean) {
    if (value) {
      this.props.history.push('/signin');
    } else {
      this.props.history.push('/signup');
    }
  }

  onSign(token: string, email: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    this.updatePath();
  }

  updatePath() {
    this.props.history.push('/dashboard');
  }

  render() {
    console.log(this.state);
    return (
      <Routes>
        <Route
          path="/"
          element={(
            <Pricing
              activateSignIn={(route: string) => this.props.history.push(route)}
              actionsButtonCards={(route: string) => this.props.history.push(route)}
              navButton={(route: string) => this.props.history.push(route)}
            />
          )}
        />
        <Route
          path="/dashboard"
          element={(
            <Auth
              noLoginRedirectPath="/"
            >
              <Dashboard />
            </Auth>
          )}
        />
        <Route
          path="/signin"
          element={(
            <NoAuth
              loginRedirectPath="/dashboard"
            >
              <SignIn onSign={this.onSign} />
            </NoAuth>
          )}
        />
        <Route
          path="/signup"
          element={(
            <NoAuth
              loginRedirectPath="/dashboard"
            >
              <SignUp onSign={this.onSign} />
            </NoAuth>
          )}
        />
        <Route
          path="*"
          element={
            <NotFound />
          }
        />
        {/* <Route path="*" element={<NotFound />} /> */}

      </Routes>
    );
  }
}

export default ControlSign;
