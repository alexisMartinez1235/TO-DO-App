//
// import React from 'react';
import { Link, Typography } from '@mui/material';

// eslint-disable-next-line
export default function Copyright(props: any): any {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}
