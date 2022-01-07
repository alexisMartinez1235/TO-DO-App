//componentes
import React from 'react';
// import LTask from './LTask'
import { 
  Button,
  TextField 
}  from '@mui/material';

//hora
import {  
  LocalizationProvider,
  DatePicker,
  StaticDatePicker
}from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Box from '@mui/material/Box';

class LInput extends React.Component{
  
    constructor(props){
      super(props);
      this.props=props
      this.state = {
        txtTask: '',
        disabledBtnAdd:false,
        selectedDate: ''
      };

      this.onClickbtnAdd = this.onClickbtnAdd.bind(this);
      this.onTxtTaskChange = this.onTxtTaskChange.bind(this);
      this.onChangeBtnExpiration = this.onChangeBtnExpiration.bind(this);
    } 
    onTxtTaskChange(e){
     this.setState({txtTask: e.target.value});
    }

    onClickbtnAdd(e) { 
      // alert('A name was submitted: ' + this.state.txtTask);
      if(this.state.txtTask !== ''){
        this.props.addItem(
            this.state.txtTask,
            this.state.selectedDate.toLocaleDateString()+'');
        this.setState({txtTask: '',selectedDate: null});
      }
    }
    onChangeBtnExpiration(date){
      this.setState({
        selectedDate: date
      });
    }
    render(){

      return (
        <Box sx={{
          display: 'flex',
          alignContent:'center',
          justifyContent: 'center',
          position: 'fixed',
          bottom: '0',
          width: '100%'
        }}>
        {/* <div class="LInput"> */}
          {/* taskname */}
          <TextField variant="outlined" name="Task name"
                  id="txtTask" value={this.state.txtTask} 
                  onChange={this.onTxtTaskChange} 
                  maxlength='30'
                  label='Description'
                  />
  
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label='Expiration'
              value={this.state.selectedDate}
              onChange={this.onChangeBtnExpiration}
              mask='__/__/____'
              renderInput={(params) => 
                    <TextField {...params} />
                  }
            />
          </LocalizationProvider>
          <Button variant="contained" id="btnAdd" color="success" onClick={this.onClickbtnAdd}
                disabled={this.state.disabledBtnAdd}>
                  +
          </Button>
  
    </Box>
        ); 
    }
}

export default LInput;