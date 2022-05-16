import * as React from 'react';
import Typography from '@mui/material/Typography';

interface TitleProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
}

export default function Title(props: TitleProps): any {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}
