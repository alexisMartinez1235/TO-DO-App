import { Box, LinearProgress } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router-dom';
import APIResponse from '../../utils/responseType';

interface IProps {
  // isLogged: boolean;
  noLoginRedirectPath: string;
}

interface IState {
  authorized: number;
}

class Auth extends React.Component<IProps, IState> {
  // private authenticated: boolean;

  constructor(props: IProps) {
    super(props);
    this.state = {
      authorized: 0,
    };
    const email = localStorage.getItem('email') || '';
    const token = localStorage.getItem('token') || '';

    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
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
          if (result.data.user.email === email) {
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

  // componentDidMount(): void {

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
