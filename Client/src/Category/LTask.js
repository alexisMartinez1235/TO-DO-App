import axios from 'axios';
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

class LTask extends React.Component{
  constructor(props){ 
    super(props);
    this.props=props
    this.state={
      error: null,  
      items: [],
      children: [],
      isLoaded: false,
      paramsGetTask:{
        variable: "ID",
        order: "ASC"
      }
    }
    this.addItem = this.addItem.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.resultF = this.resultF.bind(this);
    this.errorF = this.errorF.bind(this);
  }
  resultF(result) {
    this.setState({
      isLoaded: true,
      items: result
    });
  }
  errorF(error){
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

  addItem(nombre,expirationDate){
    this.setState({
      items : this.state.items.concat([[nombre,expirationDate]])
    });
    // this.state.lTaskModel.addTask(this);
  }
  onChangeSelect(e){
    this.setState({
      orderBy: e.target.value
    });
    // switch(param) {
    //   case 'name':
  
    //   case 'expiration date':

    //   default:
    //     return ''
        
    // }

    if(this.state.orderBy){


    }
  }
  render(){
    const children = [];
    for (var i = 0; i < this.state.items.length; i += 1) {
      children.push(<TaskItem key={i} number={i} 
        tarea={this.state.items[i][0]} 
        expirationDate={this.state.items[i][1]}

      />);
    }
    return (
      <Box sx={{
        width: '50vw'
      }}>
        {/* <div class="mainToDo"> */}
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
        <LInput addItem={this.addItem}/>
      </Box>
    ); 
  }
}

export default LTask;