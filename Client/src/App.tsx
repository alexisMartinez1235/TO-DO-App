import React from 'react';

import './App.css';
// import logo from './logo.svg';
// import LInput from './Components/LInput'
// import Bu  ttonBar from './Components/ButtonBar'
import Form from './Components/Form';
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
      <Form />
    );
  }
}

export default App;
