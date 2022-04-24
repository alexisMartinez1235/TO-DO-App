import React from 'react';
import {
  // BrowserRouter as Router,
  // Switch,
  Route,
  Routes,
  Link,
} from 'react-router-dom';
import {
  ListItemButton,
} from '@mui/material';

import SignIn from './SignIn';
import SignUp from './SignUp';
import { Dashboard, DashboardCore } from './Dashboard';
import Pricing from './Pricing';
import Auth from './Auth';
import NotFound from './NotFound';
import NoAuth from './NoAuth';
import DefaultFormTask from '../DefaultFormTask';

interface IProps {
  history: any;
}

interface IState {}

class ControlSign extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {};
    // this.props.history.push('/signin', { state: 'simple data' });
    // this.props.history.push('/signin');
    this.onSignChange = this.onSignChange.bind(this);
    this.onSign = this.onSign.bind(this);
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

    this.props.history.push({
      pathname: '/dashboard',
      state: { email, token },
    });
  }

  render() {
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
        >
          <Route
            index
            element={(
              <DashboardCore />
            )}
          />
          <Route
            path="list/:idList"
            element={(
              <Auth
                noLoginRedirectPath="/dashboard"
              >
                <DefaultFormTask />
              </Auth>
            )}
          />
          <Route
            path="*"
            element={(
              <>
                <h1>Route not found</h1>
                <ListItemButton
                  component={Link}
                  to="/dashboard"
                >
                  Go to dashboard
                </ListItemButton>
              </>
            )}
          />
        </Route>
        <Route
          path="/signin"
          element={(
            <NoAuth
              loginRedirectPath="/dashboard"
            >
              <SignIn onSign={this.onSign} history={this.props.history} />
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
