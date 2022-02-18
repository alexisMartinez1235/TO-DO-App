import React from 'react';

import './App.css';
// import logo from './logo.svg';
// import LInput from './Components/LInput'
// import Bu  ttonBar from './Components/ButtonBar'
import DefaultFormTask from './Components/DefaultFormTask';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

class App extends React.PureComponent {
  // todo: add dark mode to app
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
      <DefaultFormTask />
    );
  }
}

export default App;
