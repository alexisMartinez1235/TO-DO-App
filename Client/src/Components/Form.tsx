import React from 'react';
import FormControl from '@mui/material/FormControl';
import {
  LTask,
  // PropLT,
} from './LTask';
import {
  LInput,
} from './LInput';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  LTaskControl,
  IParms,
  ITask,
} from '../ApiCon/LTaskControl';

interface IProps {}

interface IState {
  control: LTaskControl,
}

// lTask: LTask;
// propsLT: PropLT;
// ltaskControl: LTaskControl;
class Form extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      control: new LTaskControl(),
    };

    this.addTask = this.addTask.bind(this);
    this.getTasks = this.getTasks.bind(this);
    // this.removeTask = this.removeTask.bind(this);
  }
  //
  // removeTask() {
  //   this.ltaskControl.removeTask();
  //   return 1;
  // }

  getTasks(paramsGetTask: IParms<string>): Promise<any> {
    this.addTask({
      txtTask: 'Tarea',
      expirationDate: new Date(2003, 1),
    });

    this.addTask({
      txtTask: 'Tareaaa',
      expirationDate: new Date(2002, 2),
    });
    // ? quee
    this.render();
    // return LTaskControl.GetTasks(paramsGetTask);
    return this.state.control.getTasks(paramsGetTask);
  }

  addTask(task: ITask) {
    // LTaskControl.AddTask(task);
    this.state.control.addTask(task);
    // this.setState((prevState: IState) => {
    //   prevState.items.push(task);
    // });

    // this.state.selectedDate.toLocaleDateString()
  }

  render() {
    return (
      <FormControl className="App">
        {/* <ThemeProvider theme={this.theme}> */}
        {/* {this.lTask.render()} */}
        {/* <LInput lItem={this.lTask} />
        <LTask ltaskControl={this.ltaskControl} />
        <LInput control={this.ltaskControl} /> */}
        <LTask
          getTasks={this.getTasks}
          control={this.state.control}
        />
        <LInput
          addTask={this.addTask}
          render={this.render}
        />

        {/* </ThemeProvider> */}
      </FormControl>
    );
  }
}
export default Form;
