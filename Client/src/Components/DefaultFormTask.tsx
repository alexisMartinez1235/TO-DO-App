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
    // async getTasks(): Promise<ILtask | void> {
    // const url: URL = new URL('http://localhost:8000/task');
    const url: URL = new URL(`${this.url}/tasks/`);
    url.search = new URLSearchParams(paramsGetTask).toString();
    // let response: ILtask | void = {};
    const response: any = await fetch(url.toString(), {
      method: 'get',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    const { data } = body;
    this.setState({
      tasks: data,
    });
    // const newTasks = body.map((taks: any, i:number) => {
    // });
    // console.log(newTasks);
    // return response;
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
