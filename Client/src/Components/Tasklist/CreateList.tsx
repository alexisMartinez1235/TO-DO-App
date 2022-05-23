import React from 'react';
import {
  Button,
  TextField,
  Container,
  // IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface IProps {
  AddTaskList(tasklistname: string): any;
}

interface IState {
  tasklistname: string;
}

class CreateList extends React.Component<IProps, IState> {
  // private authenticated: boolean;

  constructor(props: IProps) {
    super(props);
    this.state = {
      tasklistname: '',
    };
    // console.log(props);
    this.onTxtTaskChange = this.onTxtTaskChange.bind(this);
    this.onClickbtnAdd = this.onClickbtnAdd.bind(this);
  }

  onTxtTaskChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ tasklistname: e.target.value });
  }

  // onClickbtnAdd(e: React.MouseEvent<HTMLElement>): any {
  onClickbtnAdd(): void {
    if (this.state.tasklistname !== '') {
      this.props.AddTaskList(this.state.tasklistname.toString());
    }
    this.setState({ tasklistname: '' });
  }

  render(): any {
    return (
      <Container
        sx={{
          display: 'flex',
          // alignContent: 'center',
          // justifyContent: 'center',
          position: 'relative',
          bottom: '0',
          width: '100%',
          height: '100%',
          // alignItems: 'stretch',
        }}
        style={{
          paddingLeft: '3.75%',
          paddingRight: '3.75%',
        }}
      >
        <TextField
          variant="outlined"
          name="Task name"
          id="txtTask"
          value={this.state.tasklistname}
          onChange={this.onTxtTaskChange}
          inputProps={{
            maxLength: 12,
            'data-testid': 'Tasklistname',
          }}
          style={{
            width: '90%',
          }}
          label="Task list name"
        />

        <Button
          variant="contained"
          id="btnAdd"
          data-testid="btnAddTestTasklist"
          color="success"
          onClick={this.onClickbtnAdd}
          disabled={this.state.tasklistname === ''}
          style={{
            width: '10%',
          }}
        >
          <AddIcon />
        </Button>
      </Container>
    );
  }
}

export default CreateList;
