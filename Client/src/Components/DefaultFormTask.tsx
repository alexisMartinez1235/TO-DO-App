// import axios, {AxiosInstance} from 'axios';
// import { URLSearchParams } from "url";
import React from 'react';
// import FormControl from '@mui/material/FormControl';
import LTask from './LTask';
import LInput from './LInput';
import { ITask } from './Task';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

interface IParms<TOut>{
  [key: string]: TOut;
}

interface IProps {}

interface IState {
  tasks: Array<ITask>;
}

class DefaultFormTask extends React.Component<IProps, IState> {
  public url: string;

  constructor(props: IProps) {
    super(props);
    this.url = 'http://localhost:8000';
    this.state = {
      tasks: new Array<ITask>(),
    };

    this.addTask = this.addTask.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  async getTasks(paramsGetTask: IParms<string>): Promise< Array<ITask> > {
    const url: URL = new URL(`${this.url}/tasks/`);
    url.search = new URLSearchParams(paramsGetTask).toString();
    const response = await fetch(url.toString(), {
      method: 'get',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    const { data } = body;

    console.log(data);
    console.log(this.state.tasks);
    if (data) {
      this.setState({
        tasks: data,
      });
    }
    return this.state.tasks;
  }

  removeTask(id: string) : boolean {
    this.setState((prevS: IState) => {
      prevS.tasks.map((task: ITask, i: number, tasks: ITask[]): boolean => {
        if (task.id === id) {
          tasks.splice(i, 1);
          return true;
        }
        return false;
      });
    });

    return true;
  }

  addTask(task: ITask) {
    // fetch()
    // this.setState((prevS) => {
    //   prevS.tasks.concat(task);
    // });
    const { tasks } = this.state;
    tasks.push(task);
    this.setState({
      tasks,
    });
    // this.state.tasks.push(task);
    // this.state.selectedDate.toLocaleDateString()
  }

  // SetActivated(task: ITask, value: boolean): boolean {
  //   this.setState((prevS) => {
  //     prevS.tasks.map((wantedTask: ITask): ITask => {
  //       if (wantedTask === task) {
  //         const taskModified: ITask = wantedTask;
  //         taskModified.activated = value;
  //         return taskModified;
  //       }
  //       return task;
  //     });
  //   });
  //   return true;
  // }

  render() {
    return (
      <div
        className="DefaultFormTask"
      >
        {/* <FormControl className="DefaultFormTask"> */}
        {/* <ThemeProvider theme={this.theme}> */}
        <LTask
          tasks={this.state.tasks}
          GetTasks={this.getTasks}
          RemoveTask={this.removeTask}
          // SetActivated={this.SetActivated}
        />
        <LInput
          AddTask={this.addTask}
        />
        {/* </ThemeProvider> */}
        {/* </FormControl> */}
      </div>
    );
  }
}
export default DefaultFormTask;
