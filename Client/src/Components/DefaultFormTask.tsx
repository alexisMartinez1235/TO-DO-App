// import axios, {AxiosInstance} from 'axios';
// import { URLSearchParams } from "url";
import React from 'react';
// import FormControl from '@mui/material/FormControl';
import LTask from './LTask';
import LInput from './LInput';
import { ITask } from './Task';
import Order from './Order';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

interface IParms<TOut>{
  [key: string]: TOut;
}

interface IProps {}

interface IState {
  tasks: Array<ITask<Date>>;
}

class DefaultFormTask extends React.Component<IProps, IState> {
  public url: string;

  constructor(props: IProps) {
    super(props);
    this.url = 'http://localhost:8000';

    this.state = {
      tasks: new Array<ITask<Date>>(),
    };

    this.addTask = this.addTask.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  async getTasks(paramsGetTask?: IParms<string>): Promise<boolean> {
  // async getTasks(paramsGetTask?: IParms<string>): Promise< Array< ITask<Date> > > {
    const url: URL = new URL(`${this.url}/api/list/tasks/`);
    url.search = new URLSearchParams(paramsGetTask).toString();
    const response = await fetch(url.toString(), {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    if (body !== null) {
      const { data } = body;
      if (body.success) {
        const taskList: Array<ITask<Date>> = data.map((task: any): ITask<Date> => task);
        taskList.map((task: ITask<Date>): ITask<Date> => {
          const taskModified: ITask<Date> = task;
          if (taskModified.expirationDate !== undefined && taskModified.expirationDate !== null
          ) {
            taskModified.expirationDate = new Date(taskModified.expirationDate?.toString());
          }
          return taskModified;
        });
        this.setState({
          tasks: taskList,
        });
        return body.success;
      }
    }
    return false;
  }

  async removeTask(id: string) : Promise<boolean> {
    const url: URL = new URL(`${this.url}/api/list/tasks/logical`);
    const response = await fetch(url.toString(), {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });
    const body = await response.json();
    console.log(body);
    if (body !== null) {
      // const { data } = body;
      if (body.success) {
        this.getTasks();
      }
    }
    return true;
  }

  async addTask(taskDateString: ITask<string>) {
    const url: URL = new URL(`${this.url}/api/list/tasks/`);
    const response = await fetch(url.toString(), {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskDateString),
    });
    const body = await response.json();
    if (body !== null) {
      if (body.success) {
        this.getTasks();
      }
    }
  }
  // SetActivated(task: ITask<Date>, value: boolean): boolean {
  //   this.setState((prevS) => {
  //     prevS.tasks.map((wantedTask: ITask<Date>): ITask<Date> => {
  //       if (wantedTask === task) {
  //         const taskModified: ITask<Date> = wantedTask;
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
        <Order
          GetTasks={this.getTasks}
          optionDescription={[
            {
              value: 'description',
              display: 'Order by description',
            },
            {
              value: 'expiration date',
              display: 'Order by expiration date',
            },
          ]}
          defaultValue="description"
        />
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
