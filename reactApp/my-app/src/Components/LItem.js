import React from 'react';
import './../App.css';

class LItem extends React.Component{
    constructor(props){
      super(props);
      this.props=props
      this.state={
        tarea:''
      }
    }
    render(){
      return (
        <div class="LItemAgregado">
          <input type="checkbox" name="" id="chSelector" />
          <h1>{this.state.tarea}</h1>
        </div>
       
      ); 
    }
  }
  export default LItem;