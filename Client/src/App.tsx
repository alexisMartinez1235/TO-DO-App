import React from 'react';
import './App.css';
// import logo from './logo.svg';
// import LInput from './Components/LInput';
// import ButtonBar from './Components/ButtonBar';
import { BrowserRouter } from 'react-router-dom';
import ControlSign from './Components/User/ControlSign';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// interface IState {}

class App extends React.Component {
  render(): any {
    return (
      <BrowserRouter>
        <ControlSign />
      </BrowserRouter>
    );
  }
}

export default App;
