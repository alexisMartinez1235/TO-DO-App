// import axios from 'axios';
import React from 'react';
import LInput from './LInput';
import TaskItem from './TaskItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// import LTaskModel from 'server/Model/LTaskModel';
interface IParms{
  [key : string ] : string
}
interface ITask {
  txtTask : string,
  expirationDate : Date | null
};
interface IProps {};

interface IState {
  error : boolean,
  items : Array<ITask>,
  // children : [],
  isLoaded : boolean,
  paramsGetTask : IParms,
  orderBy : string
};
class LTask extends React.Component<IProps,IState>{
  constructor(props : IProps){ 
    super(props);
    this.state={
      error: false,  
      items: new Array<ITask>(),
      // children: [],
      isLoaded: false,
      paramsGetTask:{
        variable: "ID",
        order: "ASC"
      },
      orderBy:""
    }
    this.addItem = this.addItem.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.resultF = this.resultF.bind(this);
    this.errorF = this.errorF.bind(this);
  }
  resultF(result: any) {
    this.setState({
      isLoaded: true,
      items: result
    });
  }
  errorF(error : any){
    this.setState({
      isLoaded: true,
      error
    });
    console.log(":"+error);
  }
  componentDidMount(){
    // axios.get("http://api_server:5000/getTasks",{
    //   variable: "ID",
    //   order: "ASC",
    //   withCredentials: true
    // })
    //   .then(res => {
    //     const items = res.data;
    //     this.setState({ items });
    //     console.log(items);
    //   })
  }

  addItem(txtTask : string ,expirationDate: Date | null){
    const task : ITask = {
       txtTask : txtTask, 
       expirationDate : expirationDate
    };
    this.setState({
      items : this.state.items.concat(task) 
    });
    // this.state.lTaskModel.addTask(this);
  }
  // onChangeSelect(e: React.ChangeEvent<HTMLInputElement>){
  onChangeSelect(e: any ){
    // TODO see params
    this.setState({
      orderBy: e.target.value
    });
    // switch(param) {
    //   case 'name':
  
    //   case 'expiration date':

    //   default:
    //     return ''
        
    // }

    // if (this.state.orderBy){


    // }
  }
  render(){
    const children = [];
    for (let i : number = 0; i < this.state.items.length; i += 1) {
      children.push(<TaskItem key={i} number={i} 
        txtTask={this.state.items[i].txtTask} 
        expirationDate={this.state.items[i].expirationDate}

      />);
    }
    return (
      <Box sx={{
        width: '50vw'
      }}>
        {/* <div className="mainToDo"> */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Order By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.orderBy}
            label="Order By"
            onChange={this.onChangeSelect}
          >
            <MenuItem value={'expiration date'}>Order by expiration date </MenuItem>
            <MenuItem value={'name'}>Order by name</MenuItem>
            {/* <MenuItem value={2}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
        <Stack
          direction="column"
          spacing={2}
        >
          {children}
        </Stack>
        <LInput lItem={this}/>
      </Box>
    ); 
  }
}

export default LTask;