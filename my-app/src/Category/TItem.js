import React from 'react';
import './../App.css';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';


class TItem extends React.Component{
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
              <Checkbox
                checked={!this.state.awake}
                onChange={this.removeItem} />
                {/* name="" id="chSelector" /> */}
              <Typography variant="h4" component="h2">
                {this.props.tarea}
              </Typography>
              
              {/* <input type="checkbox" name="" id="chSelector" onClick={this.removeItem} /> */}
              {/* <h1>{this.props.tarea}</h1> */}
            </div>
          );    
      }
      return false
    }
  }
  export default TItem;