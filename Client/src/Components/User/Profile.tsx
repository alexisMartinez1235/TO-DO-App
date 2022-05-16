import React from 'react';
import { styled } from '@mui/material/styles';
import {
  // Accordion, AccordionSummary, AccordionDetails,
  Avatar,
  Badge,
  // Box,
  // Button,
  BadgeProps,
  // Container
  // FormGroup, FormControlLabel, FormControl, InputLabel,
  // Switch,
  // MenuItem,
  // SelectChangeEvent, Select,
  // Checkbox,
  Grid,
  IconButton,
  Paper,
  TextField,
  // Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import FacebookIcon from '@mui/icons-material/Facebook';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { APIResponse, host, port } from '../utils/database';

// region styledComponents
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
// endregion

interface State {
  firstName: string;
  lastName: string;
  description: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

class Profile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      description: '',
    };

    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onFacebookClick = this.onFacebookClick.bind(this);
  }

  onFirstNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ firstName: e.target.value });
  }

  onLastNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ lastName: e.target.value });
  }

  onDescriptionChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ description: e.target.value });
  }

  onFacebookClick(): boolean {
    return false;
  }

  componentDidMount() {
    this.getProfile();
  }

  componentDidUpdate() {
    this.getProfile();
  }

  getProfile(): boolean {
    const url: URL = new URL(`http://${host}:${port}/api/profile`);
    const token = localStorage.getItem('token') || '';
    const requestOptions = {
      method: 'GET',
      // mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
        Accept: '*/*',
        'Cache-control': 'no-cache',
      },
      // redirect: 'follow',
    };

    fetch(url.toString(), requestOptions)
      .then((response: any) => response.json())
      .then((result: APIResponse) => {
        console.log(result);
        if (result.success) {
          // this.setState({ tasks: result.data });
          // const { data } = result;
        }
        return result.success;
      })
      .catch((error: any) => {
        console.error('error', error);
        // alert(error);
      });
    return false;
  }

  onClickbtnEdit(): boolean {
    const url: URL = new URL(`http://${host}:${port}/api/profile`);
    const token = localStorage.getItem('token') || '';
    const requestOptions = {
      method: 'POST',
      // mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
        Accept: '*/*',
        'Cache-control': 'no-cache',
      },
      body: JSON.stringify(this.state),
      // redirect: 'follow',
    };

    fetch(url.toString(), requestOptions)
      .then((response: any) => response.json())
      .then((result: APIResponse) => {
        console.log(result);
        if (result.success) {
          // this.setState({ tasks: result.data });
          // const { data } = result;
        }
        return result.success;
      })
      .catch((error: any) => {
        console.error('error', error);
        // alert(error);
      });
    return false;
  }

  render(): any {
    return (
      <div>
        <Grid
          sx={{
            // alignContent: 'center',
            // justifyContent: 'center',
            position: 'relative',
            bottom: '0',
            width: '90%',
            height: '100%',
          }}
          style={{
            paddingLeft: '8.97%',
            paddingRight: '8.97%',
          }}
          container
          spacing={0}
        >
          <Grid item xs={12}>
            <Item
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gridRow: '2',
                padding: '10px',
              }}
            >
              <Avatar
                sx={{
                  width: '140px',
                  height: '140px',
                  // justifyContent: 'center',
                }}
              />
              <input
                type="file"
                hidden
              />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item
              sx={{
                padding: '10px',
              }}
            >
              <TextField
                variant="outlined"
                name="First name"
                id="firstName"
                value={this.state.firstName}
                onChange={this.onFirstNameChange}
                inputProps={{
                  maxLength: 30,
                }}
                style={{
                  width: '90%',
                }}
                label="First name"
              />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item
              sx={{
                padding: '10px',
              }}
            >
              <TextField
                variant="outlined"
                name="Last name"
                id="lastName"
                value={this.state.lastName}
                onChange={this.onLastNameChange}
                inputProps={{
                  maxLength: 30,
                }}
                style={{
                  width: '90%',
                }}
                label="Last name"
              />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item
              sx={{
                px: '20px',
              }}
            >
              <TextField
                variant="outlined"
                name="DescriptionProfile"
                id="descriptionProfile"
                value={this.state.description}
                onChange={this.onDescriptionChange}
                rows={5}
                inputProps={{
                  maxLength: 30,
                }}
                style={{
                  width: '100%',
                }}
                multiline
                label="Description"
              />
            </Item>
          </Grid>
          {/* <Grid item xs={10}>
            <Item>
              <Button
                variant="contained"
                id="btnEditProfile"
                data-testid="btnEditProfile"
                color="success"
                onClick={this.onClickbtnEdit}
                // disabled={this.state.tasklistname === ''}
                style={{
                  width: '90%',
                }}
              >
                <SaveIcon />
              </Button>
            </Item>
          </Grid> */}
          <Grid item xs={12}>
            <Item
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gridRow: '2',
                padding: '10px',
              }}
            >
              <IconButton
                aria-label="Facebook"
                id="btnFacebookProfile"
                data-testid="btnFacebookProfile"
                size="large"
                onClick={this.onFacebookClick}
              >
                <StyledBadge color="secondary">
                  <FacebookIcon fontSize="large" />
                </StyledBadge>
              </IconButton>
            </Item>
          </Grid>
          {/* <Grid item xs={3}>
            <Item>
              <h1>Hello</h1>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <h1>Hello</h1>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <h1>Hello</h1>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <h1>Hello</h1>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <h1>Hello</h1>
            </Item>
          </Grid> */}
        </Grid>
        {/* <Badge badgeContent={4} color="success">
          <SaveIcon color="action" />
        </Badge> */}
        <IconButton
          aria-label="save"
          // variant="contained"
          id="btnEditProfile"
          data-testid="btnEditProfile"
          color="success"
          size="large"
          sx={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
          }}
          onClick={this.onClickbtnEdit}
        >
          <StyledBadge color="secondary">
            <SaveIcon fontSize="large" />
          </StyledBadge>
        </IconButton>
      </div>
    );
  }
}

export default Profile;
