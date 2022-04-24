import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {
  Task,
  ITask,
} from './Task';
// import APIResponse from '../utils/responseType';

interface IProps {
  tasks: Array<ITask<Date>>;
  RemoveTask(id: string): boolean;
  GetTasks(paramsGetTask: any): boolean;
  // SetActivated(task: ITask<Date>, value: boolean): boolean
}

interface IState {}

class LTask extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { tasks } = this.props;

    const children = tasks.map((task: ITask<Date>): any => (
      <Task
        key={task.id?.toString() || ''}
        task={task}
        RemoveTask={this.props.RemoveTask}
        // SetActivated={this.props.SetActivated}
      />
    ));
    return (
      <Box sx={{
        width: 'auto',
        height: '500px',
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
