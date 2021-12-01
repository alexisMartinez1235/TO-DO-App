import React from 'react';
import LInput from './LInput';
import LItem from './LItem'
import ListItemButton from '@mui/material/ListItemButton'

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
        children.push(<LItem key={i} number={i} tarea={this.state.items[i]} />);
      }
      return (
        <div class="LTask">
          <ListItemButton component="a" href="#simple-list">
            {children}
          </ListItemButton>
          <LInput addItem={this.addItem}/>
        </div>
      ); 
  }
}

export default LTask;