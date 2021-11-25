import React from 'react';
import LTask from './LTask'

class LInput extends React.Component{
    constructor(props){
      super(props);
      this.props=props
      this.state = {
        txtTarea: ''
      };

      this.onClickbtnAgregar = this.onClickbtnAgregar.bind(this);
      this.onTxtTareaChange = this.onTxtTareaChange.bind(this);
    } 
    onTxtTareaChange(e){
     this.setState({txtTarea: e.target.value});
    }

    onClickbtnAgregar(e) { 
      // alert('A name was submitted: ' + this.state.txtTarea);
      this.props.addItem(this.state.txtTarea);
      // LTask.agregarItem()
      // this.setState({temperature: e.target.value}); 
    }
    render(){
      return (
        <div class="LInput">
          <input type="text" name="Nombre tarea"
                  id="txtTarea" value={this.state.txtTarea} 
                  onChange={this.onTxtTareaChange} />
          <input type="button" value="+" id="btnAgregar" onClick={this.onClickbtnAgregar}/>  
        </div>
      ); 
    }
  }
  export default LInput;