// import logo from './logo.svg';
import './App.css';
import React from 'react';
import LInput from './Components/LInput'
import LTask from './Components/LTask'
import ButtonBar from './Components/ButtonBar'
import LItem from './Components/LItem';
// import { Button } from 'reactstrap';
class App extends React.Component{
  constructor(props){
    super(props);
    this.props=props
  }

  render(){
    return (
      <div class="App">
        <LTask/>
        <ButtonBar/>
      </div>
    ); 
  }
}

export default App;
