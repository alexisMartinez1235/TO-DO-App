import React from 'react';
import { Box, LinearProgress } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { APIResponse, host, port } from '../utils/database';

interface IProps {
  loginRedirectPath: string;
  children: any;
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
      /* #region   */
      headers:
      /* #endregion */ {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
        Accept: '*/*',
        'Cache-control': 'no-cache',
      },
    };
  
    fetch(`http://${host}:${port}/api/profile`, requestOptions)
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
        console.error('error', error);
        // alert(error);
        this.setState({ authorized: 2 });
      });
  }

  render(): any {
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
