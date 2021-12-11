import React from 'react';
import LInput from './LInput';
import TItem from './TItem';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';




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
    addItem(nombre){
      // alert('Descripcion tarea:  '+nombre);
      this.setState({
        items : this.state.items.concat([nombre])
      });
      this.render();
      
    }
    render(){
      const children = [];
      for (var i = 0; i < this.state.items.length; i += 1) {
        children.push(<TItem key={i} number={i} tarea={this.state.items[i]} />);
      }
      return (
        <div class="mainToDo">
          <Stack spacing={2}>
          {/* <ListItemButton class="LTask" component="a" href="#simple-list"> */}
            {children}
          {/* </ListItemButton> */}
          </Stack>
          <LInput addItem={this.addItem}/>
        </div>
      ); 
  }
}

export default LTask;