import React from 'react';
import LInput from './LInput';
import TaskItem from './TaskItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LTaskModel from '../Model/LTaskModel';

class LTask extends React.Component{
  constructor(props){ 
    super(props);
    this.props=props
    this.state={
      items: [],
      children: [],
      orderBy:'expiration date',
      lTaskModel: new LTaskModel(  
        $MYSQL_USER,
        $MYSQL_PASSWORD 
      )  // insecure
    }
    this.addItem = this.addItem.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
  }
  addItem(nombre,expirationDate){
    this.setState({
      items : this.state.items.concat([[nombre,expirationDate]])
    });

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