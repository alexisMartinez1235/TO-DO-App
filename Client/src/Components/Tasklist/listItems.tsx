import React from 'react';
import {
  Container,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  IconButton,
} from '@mui/material';

// icons
import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import LayersIcon from '@mui/icons-material/Layers';
import ListIcon from '@mui/icons-material/List';
import DeleteIcon from '@mui/icons-material/Delete';

import { Link } from 'react-router-dom';

// import DefaultFormTask from '../DefaultFormTask';
import { APIResponse, host, port } from '../utils/database';
import BottomAppBar from './BottomAppBar';
import CreateList from './CreateList';

export const mainListItems = (
  <>
    <ListItemButton
      component={Link}
      to="/dashboard"
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    {/* <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton> */}
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="About" />
    </ListItemButton>
  </>
);

interface IProps {
  open: boolean;
}

interface IState {
  variable: string;
  order: string;
  lists: Array<any>;
}

export class ListOfListTask extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      variable: 'ID',
      order: 'ASC',
      lists: [],
    };
    // this.updateList = this.updateList.bind(this);
    // this.updateList();
    this.addTaskList = this.addTaskList.bind(this);
    this.getTasklists = this.getTasklists.bind(this);
    this.removeTasklist = this.removeTasklist.bind(this);
  }

  componentDidMount(): void {
    this.getTasklists();
  }

  getTasklists(): boolean {
    const url: URL = new URL(`http://${host}:${port}/api/list`);
    url.search = new URLSearchParams({
      variable: this.state.variable.toString(),
      order: this.state.order.toString(),
      inTrash: 'true',
    }).toString();

    const token = localStorage.getItem('token') || '';

    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
        Accept: '*/*',
        'Cache-control': 'no-cache',
      },
    };
    // console.log('getlists');

    fetch(url.toString(), requestOptions)
      .then((response: any) => response.json())
      .then((result: APIResponse) => {
        console.log(result);
        if (result.success) {
          this.setState({ lists: result.data });
        }
      })
      .catch((error: any) => console.log('error', error));
    return false;
  }

  addTaskList(listName: string): boolean {
    const url: URL = new URL(`http://${host}:${port}/api/list`);
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
      body: JSON.stringify({ listName }),
      // redirect: 'follow',
    };

    fetch(url.toString(), requestOptions)
      .then((response: any) => response.json())
      .then((result: APIResponse) => {
        // console.log(result);
        if (result.success) {
          this.getTasklists();
        }
        return result.success;
      })
      .catch((error: any) => {
        console.error('error', error);
        // alert(error);
      });
    return false;
  }

  removeTasklist(idList: string): boolean {
    const url: URL = new URL(`http://${host}:${port}/api/list/logical`);
    url.search = new URLSearchParams({ idList }).toString();
    const token = localStorage.getItem('token') || '';
    const requestOptions = {
      method: 'PUT',
      // mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
        Accept: '*/*',
        'Cache-control': 'no-cache',
      },
      body: JSON.stringify({ idList }),
      // redirect: 'follow',
    };

    fetch(url.toString(), requestOptions)
      .then((response: any) => response.json())
      .then((result: APIResponse) => {
        console.log(result);
        if (result.success) {
          this.getTasklists();
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
    // console.log(this.state);
    const { lists } = this.state;
    const listRender = lists.map((list: any): any => (
      // href={`/dashboard/list/${list.id}`}
      <ListItemButton
        key={list.id}
        component={Link}
        to={`/dashboard/list/${list.id}`}
      >
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary={list.listName} />
        <IconButton edge="end" aria-label="delete" onClick={() => this.removeTasklist(list.id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemButton>
    ));

    return (
      <Container
        sx={{
          // alignContent: 'center',
          // justifyContent: 'center',
          position: 'relative',
          bottom: '0',
          width: '100%',
          // height: '100%',
          alignItems: 'stretch',
        }}
        style={{
          paddingLeft: '3.75%',
          paddingRight: '3.75%',
        }}
      >
        <ListSubheader component="div" inset>
          Lists
        </ListSubheader>
        <Paper
          sx={{
            height: '395px',
          }}
          style={{
            maxHeight: 400,
            overflowX: 'hidden',
          }}
        >
          {listRender}
        </Paper>
        {
          (this.props.open) ? (
            <BottomAppBar moreInfo={false}>
              {/* AddTask={this.addTask} */}
              <CreateList AddTaskList={this.addTaskList} />
            </BottomAppBar>
          ) : false
        }
      </Container>
    );
  }
}
