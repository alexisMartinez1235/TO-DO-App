import React from 'react';
import {
  Button,
  TextField,
  TextFieldProps,
  Box,
} from '@mui/material';
import {
  LocalizationProvider,
  DatePicker,
  // AdapterDateFns, // StaticDatePicker∟
} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import shortid from 'shortid';
import { ITask } from './Task';

interface IProps {
  // lItem: LTask,
  AddTask(task: ITask): any;
}

interface IState {
  description: string;
  disabledBtnAdd: boolean;
  selectedDate: Date | null;
}

class LInput extends React.Component <IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      description: '',
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
    this.setState({ description: e.target.value });
  }

  // onClickbtnAdd(e: React.MouseEvent<HTMLElement>) {
  onClickbtnAdd() {
    const task: ITask = {
      id: shortid.generate(),
      description: this.state.description,
      expirationDate: this.state.selectedDate,
      activated: true,
    };
    if (this.state.description !== '') {
      this.props.AddTask(task);
    }
    this.setState({ description: '', selectedDate: null });
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
          value={this.state.description}
          onChange={this.onTxtTaskChange}
          inputProps={{
            maxLength: 12,
            'data-testid': 'Description',
          }}
          label="Description"
        />

        <LocalizationProvider
          dateAdapter={AdapterDateFns}
        >
          <DatePicker
            label="Expiration"
            value={this.state.selectedDate}
            onChange={this.onChangeBtnExpiration}
            mask="__/__/____"
            renderInput={(params: TextFieldProps) => <TextField {... params} data-testid="Expiration" />}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          id="btnAdd"
          data-testid="btnAddTest"
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

export default LInput;
