// import logo from './logo.svg';
import './App.css';
import React from 'react';
import LInput from './Category/LInput'
import LTask from './Category/LTask'
// import ButtonBar from './Category/ButtonBar'
// import { Button } from 'reactstrap';

import FormControl from '@mui/material/FormControl';

class App extends React.Component{
  constructor(props){
    super(props);
    this.props=props
  }

  render(){
    return (
      <FormControl class="App">
        <LTask/>
      </FormControl>
    ); 
  }
}

export default App;
