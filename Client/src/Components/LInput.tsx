import React from 'react';
import {
  Button,
  TextField,
} from '@mui/material';

// hora
import {
  LocalizationProvider,
  DatePicker,
  // StaticDatePicker
} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Box from '@mui/material/Box';
// import {
//   LTask,
// } from './LTask';
// import { ThirteenMpSharp } from '@mui/icons-material';

// interface ClassBaseControl {
//   addItem(txtTask: string, selectedDate: Date | null): any,
// }
import {
  ITask,
} from '../ApiCon/LTaskControl';

interface IProps {
  // lItem: LTask,
  // control?: LTaskControl,
  addTask(task: ITask): any,
  render(): any,
}

interface IState {
  txtTask: string,
  disabledBtnAdd: boolean,
  selectedDate: Date | null
}

class LInput extends React.PureComponent <IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      txtTask: '',
      disabledBtnAdd: false,
      selectedDate: null,
    };

    this.onTxtTaskChange = this.onTxtTaskChange.bind(this);
    this.onClickbtnAdd = this.onClickbtnAdd.bind(this);
    this.onChangeBtnExpiration = this.onChangeBtnExpiration.bind(this);
  }

  onChangeBtnExpiration(date: Date | null) {
    this.setState({
      selectedDate: date,
    });
  }

  onTxtTaskChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ txtTask: e.target.value });
  }

  // onClickbtnAdd(e: React.MouseEvent<HTMLElement>) {
  onClickbtnAdd() {
    const task: ITask = {
      txtTask: this.state.txtTask,
      expirationDate: this.state.selectedDate,
    };
    if (this.state.txtTask !== '') {
      this.props.addTask(task);
    }
    // this.props.render();
    this.setState({ txtTask: '', selectedDate: null });
  }

  render() {
    return (
      <Box sx={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        position: 'fixed',
        bottom: '0',
        width: '100%',
      }}
      >
        <TextField
          variant="outlined"
          name="Task name"
          id="txtTask"
          value={this.state.txtTask}
          onChange={this.onTxtTaskChange}
          inputProps={{
            maxLength: 12,
          }}
          label="Description"
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Expiration"
            value={this.state.selectedDate}
            onChange={this.onChangeBtnExpiration}
            mask="__/__/____"
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          id="btnAdd"
          color="success"
          onClick={this.onClickbtnAdd}
          disabled={this.state.disabledBtnAdd}
        >
          +
        </Button>
      </Box>
    );
  }
}

export { LInput };
export type PropLI = IProps;
