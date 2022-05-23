// import axios, {AxiosInstance} from 'axios';
// import { URLSearchParams } from "url";
import React from 'react';
// import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/material';
import LTask from './LTask';
import LInput from './LInput';
import { ITask } from './Task';
import Order from '../Order';
import { APIResponse, host, port } from '../utils/database';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import withRouter from '../utils/withRouter';
// import SpeedDialTask from './SpeedDialTask';
import BottomAppBar from './BottomAppBar';

interface IParms<TOut> {
  [key: string]: TOut;
}

// interface IProps {
//   match?: any;
// }

interface IState {
  tasks: Array<ITask<Date>>;
}

class DefaultFormTask extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      tasks: new Array<ITask<Date>>(),
    };
    this.addTask = this.addTask.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.getListId = this.getListId.bind(this);
  }

  componentDidMount(): void {
    this.getTasks();
  }

  componentDidUpdate(props: any): void {
    if (this.getListId() !== props.router.params.idList.toString()) {
      this.getTasks();
    }
  }

  componentWillUnmount(): void {
    this.setState({ tasks: [] });
  }

  getListId(): string {
    return this.props.router.params.idList.toString();
  }

  // async getTasks(paramsGetTask?: IParms<string>): Promise< Array< ITask<Date> > > {
  getTasks(paramsGetTask?: IParms<string>): boolean {
    const url: URL = new URL(`http://${host}:${port}/api/list/task`);
    url.search = new URLSearchParams({
      ...paramsGetTask,
      idList: this.getListId(),
      isActivated: 'true',
    }).toString();

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
        // console.log(result);
        if (result.success) {
          // this.setState({ tasks: result.data });
          const { data } = result;
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
        }
        return result.success;
      })
      .catch((error: any) => {
        console.error('error', error);
        // alert(error);
      });
    return false;
  }

  removeTask(id: string): boolean {
    const url: URL = new URL(`http://${host}:${port}/api/list/task/logical`);
    url.search = new URLSearchParams({ idList: this.getListId() }).toString();

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
      body: JSON.stringify({ id }),
      // redirect: 'follow',
    };

    fetch(url.toString(), requestOptions)
      .then((response: any) => response.json())
      .then((result: APIResponse) => {
        // console.log(result);
        if (result.success) {
          this.getTasks();
        }
        return result.success;
      })
      .catch((error: any) => {
        console.error('error', error);
        // alert(error);
      });
    return false;
  }

  addTask(taskDateString: ITask<string>): boolean {
    const url: URL = new URL(`http://${host}:${port}/api/list/task`);
    url.search = new URLSearchParams({ idList: this.getListId() }).toString();
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
      body: JSON.stringify(taskDateString),
      // redirect: 'follow',
    };

    fetch(url.toString(), requestOptions)
      .then((response: any) => response.json())
      .then((result: APIResponse) => {
        // console.log(result);
        if (result.success) {
          this.getTasks();
        }
        return result.success;
      })
      .catch((error: any) => {
        console.error('error', error);
        // alert(error);
      });
    return false;
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

  render(): any {
    return (
      <Box
        className="DefaultFormTask"
        sx={{
          height: '100%',
        }}
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
              value: 'expirationDate',
              display: 'Order by expiration date',
            },
          ]}
          defaultValue="description"
        />
        {/* GetTasks={this.getTasks} */}
        <LTask
          tasks={this.state.tasks}
          RemoveTask={this.removeTask}
          // SetActivated={this.SetActivated}
        />
        {/* // idList={this.props.match.params.idList} */}
        {/* <SpeedDialTask /> */}
        <BottomAppBar moreInfo>
          <LInput
            AddTask={this.addTask}
          />
        </BottomAppBar>
        {/* <LInput
          AddTask={this.addTask}
        /> */}
        {/* </ThemeProvider> */}
        {/* </FormControl> */}
      </Box>
    );
  }
}
export default withRouter(DefaultFormTask);
