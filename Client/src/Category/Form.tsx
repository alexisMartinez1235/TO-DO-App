import React from 'react';
import FormControl from '@mui/material/FormControl';
import {
  LTask,
  PropLT,
} from './LTask';
import {
  LInput,
} from './LInput';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

class Form extends React.PureComponent {
  lTask: LTask;

  propsLT: PropLT;

  constructor(props: any) {
    super(props);
    this.propsLT = {};
    this.lTask = new LTask(this.propsLT);
    console.log(this.lTask);
  }

  render() {
    return (
      <FormControl className="App">
        {/* <ThemeProvider theme={this.theme}> */}
        {/* {this.lTask.render()} */}
        {/* <LInput lItem={this.lTask} /> */}
        <LTask />
        <LInput lItem={this.lTask} />

        {/* </ThemeProvider> */}
      </FormControl>
    );
  }
}
export default Form;
