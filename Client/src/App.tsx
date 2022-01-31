import React from 'react';
import './App.css';
// import logo from './logo.svg';
// import LInput from './Category/LInput'
// import ButtonBar from './Category/ButtonBar'
import FormControl from '@mui/material/FormControl';
import LTask from './Category/LTask';

// import { createTheme, ThemeProvider } from '@mui/material/styles';

class App extends React.PureComponent {
  // todo : add dark mode to app
  // theme() {
  //   return
  //     createTheme({
  //       palette: {
  //         mode: 'dark'
  //       }
  //     });
  // }
  render() {
    return (
      <FormControl className="App">
        {/* <ThemeProvider theme={this.theme}> */}
        <LTask />
        {/* </ThemeProvider> */}
      </FormControl>
    );
  }
}

export default App;
