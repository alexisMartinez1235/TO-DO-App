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
import NotFound from '../utils/NotFound';
import NoAuth from './NoAuth';
import DefaultFormTask from '../Tasklist/DefaultFormTask';
import withRouter from '../utils/withRouter';

interface IProps {
  router: any;
}

interface IState {}

class ControlSign extends React.PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {};
    // this.props.router.navigate('/signin', { state: 'simple data' });
    // this.props.router.navigate('/signin');
    this.onSignChange = this.onSignChange.bind(this);
    this.onSign = this.onSign.bind(this);
    // this.logout = this.logout.bind(this);
  }

  onSignChange(value: boolean) {
    if (value) {
      this.props.router.navigate('/signin');
    } else {
      this.props.router.navigate('/signup');
    }
  }

  onSign(token: string, email: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);

    this.props.router.navigate({
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
              activateSignIn={(route: string) => this.props.router.navigate(route)}
              actionsButtonCards={(route: string) => this.props.router.navigate(route)}
              navButton={(route: string) => this.props.router.navigate(route)}
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
              <SignIn onSign={this.onSign} history={this.props.router.history} />
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

export default withRouter(ControlSign);
