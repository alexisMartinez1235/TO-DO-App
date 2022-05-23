import React from 'react';
import {
  Stack,
  // Paper,
  Box,
} from '@mui/material';
import {
  Task,
  ITask,
} from './Task';
// import APIResponse from '../utils/responseType';

interface IProps {
  tasks: Array<ITask<Date>>;
  RemoveTask(id: string): boolean;
  // SetActivated(task: ITask<Date>, value: boolean): boolean
}

// interface IState {}

class LTask extends React.Component<IProps, any> {
  // constructor(props: IProps): any {
  //   super(props);
  //   // this.state = {};
  // }

  render(): any {
    const { tasks } = this.props;

    // SetActivated={this.props.SetActivated}
    const children = tasks.map((task: ITask<Date>): any => (
      <Task
        key={task.id?.toString() || ''}
        task={task}
        RemoveTask={this.props.RemoveTask}
      />
    ));

    return (
      <Box sx={{
        width: 'auto',
        height: '448px',
        py: '10px',
        px: '24px',
      }}
      >
        <Stack
          data-testid="ltask"
          direction="column"
          spacing={2}
        >
          {children}
        </Stack>
      </Box>
    );
  }
}

export default LTask;
