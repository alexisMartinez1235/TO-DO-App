import { Box, LinearProgress } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router-dom';
import APIResponse from '../utils/responseType';

interface IProps {
  noLoginRedirectPath: string;
  match?: any;
}

interface IState {
  authorized: number;
  email: string;
  token: string;
}

class Auth extends React.Component<IProps, IState> {
  // private authenticated: boolean;

  constructor(props: IProps) {
    super(props);
    this.state = {
      authorized: 0,
      email: localStorage.getItem('email') || '',
      token: localStorage.getItem('token') || '',
    };
    // console.log(props);
  }

  componentDidMount(): void {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        'Content-type': 'application/json',
        Accept: '*/*',
        'Cache-control': 'no-cache',
      },
    };

    fetch('http://localhost:8000/api/profile', requestOptions)
      .then((response: any) => response.json())
      .then((result: APIResponse) => {
        // console.log(result);
        if (result.success) {
          if (result.data.user.email === this.state.email) {
            this.setState({ authorized: 1 });
            // this.authenticated = true;
          }
        }
      })
      .catch((error: any) => {
        console.log('error', error);
        this.setState({ authorized: 2 });
      });
  }

  // componentWillUnmount() {
  //
  // }

  render() {
    // if (this.authenticated) return (this.props.children);
    // state: {from: props.location}
    if (this.state.authorized === 2) {
      return (
        <Navigate
          to={this.props.noLoginRedirectPath}
          replace
        />
      );
    }
    if (this.state.authorized === 1) return (this.props.children);
    // implicit this.state.authorized === 1
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }
}

export default Auth;
