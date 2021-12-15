import React from 'react';
import LInput from './LInput';
import TItem from './TItem';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

class LTask extends React.Component{
  constructor(props){
    super(props);
    this.props=props
    this.state={
      items: [],
      children: []
    }
    this.addItem = this.addItem.bind(this);
  }
  addItem(nombre,expirationDate){
    this.setState({
      items : this.state.items.concat([[nombre,expirationDate]])
    });      
  }
  render(){
    const children = [];
    for (var i = 0; i < this.state.items.length; i += 1) {
      children.push(<TItem key={i} number={i} 
        tarea={this.state.items[i][0]} 
        expirationDate={this.state.items[i][1]}
      
      />);
    }
    return (
      <Box sx={{
        width: '50vw'
      }}>
      {/* <div class="mainToDo"> */}
        <Stack
          direction="column"
          spacing={2}
        >
        {/* <ListItemButton class="LTask" component="a" href="#simple-list"> */}
          {children}
        {/* </ListItemButton> */}
        </Stack>
        <LInput addItem={this.addItem}/>
      </Box>
    ); 
  }
}

export default LTask;