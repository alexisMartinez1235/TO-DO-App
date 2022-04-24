import React from 'react';
import {
  Button,
  TextField,
  TextFieldProps,
  Container,
} from '@mui/material';
import {
  LocalizationProvider,
  DatePicker,
  // AdapterDateFns, // StaticDatePicker∟
} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { ITask } from './Task';

interface IProps {
  // lItem: LTask,
  AddTask(task: ITask<string>): any;
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
    if (this.state.description !== '' && this.state.selectedDate !== null) {
      const date: string = this.state.selectedDate?.toISOString().substring(0, 19);
      const sendTaskS: ITask<string> = {
        description: this.state.description,
        expirationDate: date,
        activated: true,
      };
      this.props.AddTask(sendTaskS);
    }
    this.setState({ description: '', selectedDate: null });
  }

  render() {
    return (
      <Container sx={{
        display: 'flex',
        // alignContent: 'center',
        // justifyContent: 'center',
        position: 'relative',
        bottom: '0',
        width: '100%',
        height: '100%',
        padding: '0',
        alignItems: 'stretch',
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
          style={{
            width: '45%',
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
            renderInput={(params: TextFieldProps) => (
              <TextField
                {... params}
                data-testid="Expiration"
                style={{
                  width: '45%',
                }}
              />
            )}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          id="btnAdd"
          data-testid="btnAddTest"
          color="success"
          onClick={this.onClickbtnAdd}
          disabled={this.state.disabledBtnAdd}
          style={{
            width: '10%',
          }}
        >
          +
        </Button>
      </Container>
    );
  }
}

export default LInput;
