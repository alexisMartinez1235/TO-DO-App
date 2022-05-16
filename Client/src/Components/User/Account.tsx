import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Accordion, AccordionSummary, AccordionDetails,
  // Avatar,
  Badge,
  // Box,
  // Button,
  BadgeProps,
  // Container
  FormGroup, FormControlLabel, FormControl, InputLabel,
  // Switch,
  MenuItem,
  SelectChangeEvent, Select,
  Checkbox,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
  email: string;
  unitTimeToSendEmailNotification: number;
  sendEmailNotifications: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

class Account extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      unitTimeToSendEmailNotification: 0,
      sendEmailNotifications: false,
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onUnitTimeToSendEmailChange = this.onUnitTimeToSendEmailChange.bind(this);
    this.onSendEmailNotificationsChange = this.onSendEmailNotificationsChange.bind(this);
  }
  
  onEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ email: e.target.value });
  }

  onUnitTimeToSendEmailChange(e: SelectChangeEvent<number>): void {
    this.setState({ unitTimeToSendEmailNotification: Number(e.target.value) });
  }

  onSendEmailNotificationsChange(_e: React.ChangeEvent<HTMLInputElement>, checked: boolean): void {
    this.setState({ sendEmailNotifications: Boolean(checked)});
  }

  componentDidMount() {
    this.getProfile();
  }

  componentDidUpdate() {
    this.getProfile();
  }

  getProfile(): boolean {
    const url: URL = new URL(`http://${host}:${port}/api/account`);
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
    const url: URL = new URL(`http://${host}:${port}/api/account`);
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
                padding: '10px',
              }}
            >
              <TextField
                variant="outlined"
                name="Email"
                id="email"
                value={this.state.email}
                onChange={this.onEmailChange}
                inputProps={{
                  maxLength: 36,
                }}
                style={{
                  width: '95%',
                }}
                label="Email"
              />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item
              sx={{
                padding: '10px',
              }}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Notifications</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: '0',
                    margin: '0',
                  }}
                >
                  <FormGroup>
                    <Grid
                      sx={{
                        position: 'relative',
                        padding: '10px',
                        bottom: '0',
                        width: '100%',
                        height: '100%',
                      }}
                      container
                      spacing={0}
                    >
                      <Grid item xs={6}>
                        <Item
                          sx={{
                            display: 'flex',
                            padding: '17px',
                            paddingLeft: '20px',
                            align: 'left',
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={this.state.sendEmailNotifications}
                                onChange={this.onSendEmailNotificationsChange}
                              />
                            }
                            label="email notifications"
                          />
                        </Item>
                      </Grid>
                      <Grid item xs={6}>
                        <Item
                          sx={{
                            display: 'flex',
                            padding: '10px',
                            align: 'left',
                          }}
                        >
                          <FormControl variant="standard">
                            <TextField
                              disabled={!this.state.sendEmailNotifications}
                              id="textfield-time-email-notification"
                              label="Time"
                            />
                          </FormControl>
                          <FormControl>
                            <InputLabel id="label-unit-email-time-notification">Unit</InputLabel>
                            <Select
                              disabled={!this.state.sendEmailNotifications}
                              labelId="select-unit-email-time-notification"
                              id="id-select-unit-email-time-notification"
                              value={this.state.unitTimeToSendEmailNotification}
                              label="time"
                              onChange={this.onUnitTimeToSendEmailChange}
                            >
                              <MenuItem value={0}>Day</MenuItem>
                              <MenuItem value={1}>Week</MenuItem>
                              <MenuItem value={2}>Month</MenuItem>
                              <MenuItem value={3}>Year</MenuItem>
                            </Select>
                          </FormControl>
                        </Item>
                      </Grid>
                      <Grid item xs={6}>
                        <Item
                          sx={{
                            display: 'flex',
                            padding: '20px',
                            align: 'left',
                          }}
                        >
                          <FormControlLabel control={<Checkbox defaultChecked />} label="pop ups" />
                        </Item>
                      </Grid>
                    </Grid>
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            </Item>
          </Grid>
          {/* <Grid item xs={4}>
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
            </Item>
          </Grid> */}
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

export default Account;
