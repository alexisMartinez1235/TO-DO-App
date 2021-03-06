import React from 'react';
import './App.css';
// import logo from './logo.svg';
// import LInput from './Components/LInput';
// import ButtonBar from './Components/ButtonBar';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ControlSign from './Components/User/ControlSign';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

const AppHistory = createBrowserHistory();
interface IState {}

class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <ControlSign history={AppHistory} />
      </BrowserRouter>
    );
  }
}

export default App;
