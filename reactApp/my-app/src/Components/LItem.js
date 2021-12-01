import React from 'react';
import './../App.css';
import TextField from '@mui/material/TextField';

class LItem extends React.Component{
    constructor(props){
        super(props);
        this.props=props
        this.state={
          awake:true
        }
        this.removeItem = this.removeItem.bind(this);

    }
    removeItem(){
      this.setState({
        awake:false
      });
    }
    render(){
      if(this.state.awake){
          return (
            <div class="LItemAgregado">
              <input type="checkbox" name="" id="chSelector" onClick={this.removeItem} />
              <h1>{this.props.tarea}</h1>
            </div>
          );    
      }
      return false
    }
  }
  export default LItem;