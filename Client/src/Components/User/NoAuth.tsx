import { Box, LinearProgress } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router-dom';
import APIResponse from '../../utils/responseType';

interface IProps {
  // isLogged: boolean;
  loginRedirectPath: string;
}

interface IState {
  authorized: number;
}

class NoAuth extends React.Component<IProps, IState> {
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

  render() {
    if (this.state.authorized === 1) {
      return (
        <Navigate
          to={this.props.loginRedirectPath}
          replace
        />
      );
    }
    if (this.state.authorized === 2) return (this.props.children);
    // implicit this.state.authorized === 1
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }
}

export default NoAuth;
