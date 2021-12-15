import React from 'react';
import './App.css';
// import logo from './logo.svg';
// import LInput from './Category/LInput'
// import ButtonBar from './Category/ButtonBar'
import LTask from './Category/LTask'
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';

class App extends React.Component{
  constructor(props){
    super(props);
    this.props=props;
    // this.theme = this.theme.bind(this);

  }
  // todo : add dark mode to app
  // theme(){
  //   return 
  //     createTheme({
  //       palette: {
  //         mode: 'dark'
  //       }
  //     });
  // }
  render(){
    return (
        <FormControl class="App">
          {/* <ThemeProvider theme={this.theme}> */}
            <LTask/>
          {/* </ThemeProvider> */}
        </FormControl>
    ); 
  }
}

export default App;
