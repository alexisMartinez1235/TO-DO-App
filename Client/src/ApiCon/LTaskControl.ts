// import axios, {AxiosInstance} from 'axios';
// import { URLSearchParams } from "url"

interface IParms<tOut>{
  [key : string] : tOut
}

// interface ITask {
//   txtTask : string,
//   expirationDate : Date | null
// }

// interface ILtask {
//   [i : number ] : ITask
// }

class LTaskControl {
  public paramsGetTask : IParms<string>;
  public orderBy: string;

  constructor() {
    this.paramsGetTask = {
      variable: 'DESCRIPTION',
      order: 'DESC',
    };

    this.orderBy = '';
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addItem(nombre : string, expirationDate : Date | null) {
    // fetch()
    return [this.orderBy, nombre, expirationDate];
  }

  async getTasks() : Promise<any> {
    // async getTasks() : Promise<ILtask | void> {
    // const url : URL = new URL('http://localhost:8000/task/get');
    const url : URL = new URL('http://localhost:8000/task/get');
    url.search = new URLSearchParams(this.paramsGetTask).toString();
    // let response : ILtask | void = {};
    let response : any;

    console.log('fdsafa');

    await fetch(url.toString(), {
      method: 'get',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res);
        res.json();
      })
      .then((data) => {
        response = data;
        console.log(data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
    return response;
  }

  removeItem() {
    return this.orderBy;
  }
}

export default LTaskControl;
