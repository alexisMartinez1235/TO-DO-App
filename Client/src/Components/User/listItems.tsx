import React from 'react';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';

// icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import ListIcon from '@mui/icons-material/List';

import { Link } from 'react-router-dom';

// import DefaultFormTask from '../DefaultFormTask';
import APIResponse from '../../utils/responseType';

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
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
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
    </ListItemButton>
  </>
);

interface IProps {}

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
  }

  componentDidMount() {
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

    fetch(`http://localhost:8000/api/list?variable=${this.state.variable}&order=${this.state.order}`, requestOptions)
      .then((response: any) => response.json())
      .then((result: APIResponse) => {
        // console.log(result);
        if (result.success) {
          this.setState({ lists: result.data });
        }
      })
      .catch((error: any) => console.log('error', error));
  }

  render() {
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
      </ListItemButton>
    ));
    return (
      <>
        <ListSubheader component="div" inset>
          Lists
        </ListSubheader>
        {listRender}
        {/* <DefaultFormTask /> */}
      </>
    );
  }
}
