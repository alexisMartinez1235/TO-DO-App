import React from 'react';

class ButtonBar extends React.Component{
    constructor(props){
      super(props);
      this.props=props
    }
    render(){
      return (
        <div class="ButtonBar">
            <input type="button" value="X"/>
            <input type="button" value="Modificar" />
        </div>
       
      ); 
    }
  }
  export default ButtonBar;