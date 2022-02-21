import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export interface ITask {
  id: string;
  description: string;
  expirationDate: Date | null;
  activated: boolean;
}

interface IProps {
  key: string;
  task: ITask;
  RemoveTask(id: string): boolean;
  // SetActivated(task: ITask, value: boolean): boolean;
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
    this.props.RemoveTask(this.props.task.id);
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
