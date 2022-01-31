import React from 'react';
// import LTask from './LTask';
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
import LTask from './LTask';

interface IProps {
    lItem : LTask
}

interface IState {
    txtTask : string,
    disabledBtnAdd : boolean,
    selectedDate : Date | null
}

class LInput extends React.PureComponent <IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      txtTask: '',
      disabledBtnAdd: false,
      selectedDate: null,
    };
    this.onClickbtnAdd = this.onClickbtnAdd.bind(this);
    this.onTxtTaskChange = this.onTxtTaskChange.bind(this);
    this.onChangeBtnExpiration = this.onChangeBtnExpiration.bind(this);
  }

  onTxtTaskChange(e : React.ChangeEvent<HTMLInputElement>) {
    this.setState({ txtTask: e.target.value });
  }

  // onClickbtnAdd(e : React.MouseEvent<HTMLElement>) {
  onClickbtnAdd() {
    if (this.state.txtTask !== '') {
      this.props.lItem.addItem(
        this.state.txtTask,
        this.state.selectedDate,
        // this.state.selectedDate.toLocaleDateString()
      );
      this.setState({ txtTask: '', selectedDate: null });
    }
  }

  onChangeBtnExpiration(date : Date | null) {
    this.setState({
      selectedDate: date,
    });
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

export default LInput;
