import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export interface ITask<TExpiration> {
  id?: string | undefined;
  description: string;
  expirationDate: TExpiration | null;
  activated: boolean;
}

interface IProps {
  key: string;
  task: ITask<Date>;
  RemoveTask(id: string): boolean;
  // SetActivated(task: ITask<Date>, value: boolean): boolean;
}

interface IState {
  awake: boolean;
}

class Task extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      awake: true,
    };
    this.removeTask = this.removeTask.bind(this);
    this.getDate = this.getDate.bind(this);
  }

  getDate() {
    const date = this.props.task.expirationDate;

    if (date !== null) {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
    return false;
  }

  removeTask() {
    this.setState({
      awake: false,
    });
    const id = this.props.task.id?.toString();
    if (id !== undefined) this.props.RemoveTask(id);
  }

  render() {
    if (this.state.awake) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'left',
          }}
        >
          {/* <div className="LItemAgregado"> */}
          <Checkbox
            checked={!this.state.awake}
            onChange={this.removeTask}
          />

          <Typography
            variant="h4"
            component="h4"
            // maxRows="3"
          >
            {this.props.task.description}
          </Typography>

          <Typography
            variant="h4"
            component="h2"
            ml="auto"
            sx={{
              float: 'right',
            }}
          >
            {this.getDate()}
          </Typography>
        </Box>
      );
    }
    return false;
  }
}

export { Task };
