import React from 'react';
import LTask from './LTask'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

class LInput extends React.Component{
    constructor(props){
      super(props);
      this.props=props
      this.state = {
        txtTarea: '',
        disabledBtnAgregar:false,
        calendar:'', 
      };

      this.onClickbtnAgregar = this.onClickbtnAgregar.bind(this);
      this.onTxtTareaChange = this.onTxtTareaChange.bind(this);
      this.onClickBtnCalendario = this.onClickBtnCalendario.bind(this);

    } 
    onTxtTareaChange(e){
     this.setState({txtTarea: e.target.value});
    }

    onClickbtnAgregar(e) { 
      // alert('A name was submitted: ' + this.state.txtTarea);
      this.props.addItem(this.state.txtTarea);
      this.setState({txtTarea: ""});
      // LTask.agregarItem()
      // this.setState({temperature: e.target.value}); 
    }
    onClickBtnCalendario(e){
      if(true){
        this.setState({
          calendar: 'aaa',
          disabledBtnAgregar: this.state.txtTarea === ''
        });
      }
    }
    render(){
      return (
        <div class="LInput">
          <TextField variant="outlined" name="Nombre tarea"
                  id="txtTarea" value={this.state.txtTarea} 
                  onChange={this.onTxtTareaChange} />
                  {/* onEnter={this.onClickbtnAgregar}  */}
          
          <Button variant="contained" id="btnCalendario" onClick={this.onClickBtnCalendario}>
                #
          </Button>
          <Button variant="contained" id="btnAgregar" onClick={this.onClickbtnAgregar}
                disabled={this.state.disabledBtnAgregar}>
                  +
          </Button>
  
        </div>
      ); 
    }
  }
  export default LInput;