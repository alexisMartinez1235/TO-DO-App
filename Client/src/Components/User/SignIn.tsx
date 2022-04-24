import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import APIResponse from '../../utils/responseType';
import Copyright from '../Copyright';
import defaultTheme from '../../utils/theme';

interface IProps {
  history: any;
  onSign(token: string, email: string): any;
}
// interface IState {
//   email: string,
//   password: string,
// }

export default function SignIn(props: IProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email: string | undefined = data.get('email')?.toString();
    const password: string | undefined = data.get('password')?.toString();

    if (!(email === undefined || password === undefined)) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: '*/*',
          'Cache-control': 'no-cache',
        },
        body: JSON.stringify({ email, password }),
        // redirect: 'follow',
      };

      fetch('http://localhost:8000/api/signin', requestOptions)
        .then((response: any) => response.json())
        .then((result: APIResponse) => {
          // console.log(result);
          if (result.success) {
            props.onSign(result.data.token, result.data.user.email);
            props.history.push('/dashboard');
          }
        })
        .catch((error: any) => {
          console.log('error', error);
        });
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="/forget"
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                {/* onClick={() => {
                  props.changeToSignin(false);
                }} */}
                <Link
                  href="/signup"
                  variant="body2"
                >
                  Dont have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
