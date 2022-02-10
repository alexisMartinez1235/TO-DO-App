// import axios, {AxiosInstance} from 'axios';
// import { URLSearchParams } from "url"

export interface IParms<TOut>{
  [key: string]: TOut
}

export interface ITask {
  txtTask: string,
  expirationDate: Date | null
}

// interface ILtask {
//   [i: number ]: ITask
// }

class LTaskControl {
  // public paramsGetTask: IParms<string>;
  public items: Array<ITask>;

  // public orderBy: string = '';
  // private static ltaskSingleton: LTaskControl;
  // this.paramsGetTask = {
  //   variable: 'DESCRIPTION',
  //   order: 'DESC',
  // };
  // this.orderBy = '';
  constructor() {
    this.items = new Array<ITask>();
  }

  addTask(task: ITask) {
    // fetch()
    // const task: ITask = {
    //   txtTask,
    //   expirationDate,
    // };
    this.items.push(task);
    console.log(task);
    // return [this.orderBy, nombre, expirationDate];
  }

  async getTasks(paramsGetTask: IParms<string>): Promise<any> {
    // async getTasks(): Promise<ILtask | void> {
    // const url: URL = new URL('http://localhost:8000/task/get');
    const url: URL = new URL('http://localhost:8000/task/get');
    url.search = new URLSearchParams(paramsGetTask).toString();
    // let response: ILtask | void = {};
    let response: any;

    await fetch(url.toString(), {
      method: 'get',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res.body);
        res.json();
      })
      .then((data) => {
        console.log(data);
        response = data;
      })
      .catch((rejected) => {
        console.log(rejected);
      });
    if (response) {
      // this.items= response
      console.log(response);
    }
    return this.items;
  }

  // removeTask(pos: number) {
  //   return 1;
  // }
}

export { LTaskControl };
