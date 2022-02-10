import React from 'react';
import { SelectChangeEvent } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TaskItem from './TaskItem';
import {
  // ITask,
  IParms,
  LTaskControl,
} from '../ApiCon/LTaskControl';

interface IProps {
  control: LTaskControl;
  getTasks(param: IParms<string>): any
  // items: Array<ITask>
}

interface IState {
  // error: boolean,
  // items: Array<ITask>,
  // children: [],
  // isLoaded: boolean,
  // paramsGetTask: IParms,
  orderBy: string
}

class LTask extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      // items: this.props.items,
      // children: [],
      // isLoaded: false,
      orderBy: '',
    };
    this.onChangeSelect = this.onChangeSelect.bind(this);
  }

  componentDidMount() {
    this.props.getTasks({
      variable: 'DESCRIPTION',
      order: 'DESC',
    });
    // this.ltaskControl.getTasks();
    // console.log(this.state);
    // this.setState({
    //     items: this.ltaskControl.getTasks().data,
    //     isLoaded: this.ltaskControl.getTasks().success,
    // });
    // this.addItem = this.addItem.bind(this);
  }

  onChangeSelect(e: SelectChangeEvent<string>) {
    // TODO see params
    this.setState({
      orderBy: e.target.value,
    });
  }

  render() {
    // const state = this.state;
    const children = [];
    const { items } = this.props.control;

    for (let i: number = 0; i < items.length; i += 1) {
      children.push(<TaskItem
        key={i}
        number={i}
        txtTask={items[i].txtTask}
        expirationDate={items[i].expirationDate}
      />);
    }
    return (
      <Box sx={{
        width: '50vw',
      }}
      >
        {/* <div className="mainToDo"> */}
        {/* <div>{ this.state.isLoaded }</div> */}
        {/* <div>{ this.state.error }</div> */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Order By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.orderBy}
            label="Order By"
            onChange={this.onChangeSelect}
          >
            <MenuItem value="expiration date">Order by expiration date </MenuItem>
            <MenuItem value="name">Order by name</MenuItem>
            {/* <MenuItem value={2}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
        <Stack
          direction="column"
          spacing={2}
        >
          {children}
        </Stack>
        {this.state.orderBy}
      </Box>
    );
  }
}

export { LTask };
export type PropLT = IProps;
