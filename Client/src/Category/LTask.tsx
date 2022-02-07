import React from 'react';
import { SelectChangeEvent } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TaskItem from './TaskItem';
import LTaskControl from '../ApiCon/LTaskControl';
// import LInput from './LInput';

interface ITask {
  txtTask : string,
  expirationDate : Date | null
}

interface IProps {}

interface IState {
  error : boolean,
  items : Array<ITask>,
  // children : [],
  isLoaded : boolean,
  // paramsGetTask : IParms,
  orderBy : string
}

class LTask extends React.PureComponent<IProps, IState> {
  ltaskControl : LTaskControl;

  constructor(props : IProps) {
    super(props);
    this.state = {
      error: false,
      items: new Array<ITask>(),
      // children: [],
      isLoaded: false,
      orderBy: '',
    };
    this.ltaskControl = new LTaskControl();
    // this.addItem = this.addItem.bind(this);
    // this.onChangeSelect = this.onChangeSelect.bind(this);
    // this.resultF = this.resultF.bind(this);
    // this.errorF = this.errorF.bind(this);
  }

  componentDidMount() {
    // this.ltaskControl.getTasks();
    // console.log(this.state);
    // this.setState({
    //     items: this.ltaskControl.getTasks().data,
    //     isLoaded: this.ltaskControl.getTasks().success,
    // });
    this.addItem = this.addItem.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.resultF = this.resultF.bind(this);
    this.errorF = this.errorF.bind(this);
  }

  onChangeSelect(e: SelectChangeEvent<string>) {
    // TODO see params
    this.setState({
      orderBy: e.target.value,
    });
  }

  errorF(error : any) {
    this.setState({
      isLoaded: true,
      error,
    });
    console.log(`Error: ${error}`);
  }

  resultF(result: any) {
    this.setState({
      isLoaded: true,
      items: result,
    });
  }

  addItem(txtTask : string, expirationDate: Date | null) {
    const task : ITask = {
      txtTask,
      expirationDate,
    };
    this.setState((prevState: IState) => {
      prevState.items.concat(task);
    });
  }

  render() {
    // const state = this.state;
    const children = [];
    for (let i : number = 0; i < this.state.items.length; i += 1) {
      children.push(<TaskItem
        key={i}
        number={i}
        txtTask={this.state.items[i].txtTask}
        expirationDate={this.state.items[i].expirationDate}
      />);
    }
    return (
      <Box sx={{
        width: '50vw',
      }}
      >
        {/* <div className="mainToDo"> */}
        <div>{ this.state.isLoaded }</div>
        <div>{ this.state.error }</div>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Order By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.ltaskControl.orderBy}
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
