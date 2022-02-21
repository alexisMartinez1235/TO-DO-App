import React from 'react';
import { SelectChangeEvent } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  Task,
  ITask,
} from './Task';

interface IProps {
  tasks: Array<ITask>;
  RemoveTask(id: string): boolean;
  GetTasks(paramsGetTask: any): Promise<any>;
  // SetActivated(task: ITask, value: boolean): boolean
}

interface IState {
  // error: boolean;
  // tasks: Array<ITask>;
  // children: [];
  // isLoaded: boolean;
  // paramsGetTask: IParms;
  orderBy: string;
}

class LTask extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      // children: [],
      orderBy: '',
    };
    this.onChangeSelect = this.onChangeSelect.bind(this);
  }

  componentDidUpdate() {
    // console.log(this.props.tasks);
    const tasks = 1;
    this.props.GetTasks({
      variable: 'id',
      order: 'ASC',
    });
    // TODO : update
    console.log(tasks);
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
    // let children = [];
    const { tasks } = this.props;
    // const { tasks } = this.state;

    const children = tasks.map((task: ITask): any => (
      <Task
        key={task.id}
        task={task}
        RemoveTask={this.props.RemoveTask}
        // SetActivated={this.props.SetActivated}
      />
    ));
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
          data-testid="ltask"
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

export default LTask;
