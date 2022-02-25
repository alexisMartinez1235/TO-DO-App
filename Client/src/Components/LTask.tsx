import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {
  Task,
  ITask,
} from './Task';

interface IProps {
  tasks: Array<ITask<Date>>;
  RemoveTask(id: string): Promise<boolean>;
  GetTasks(paramsGetTask: any): Promise<boolean>;
  // SetActivated(task: ITask<Date>, value: boolean): boolean
}

interface IState {
  // error: boolean;
  // tasks: Array<ITask<Date>>;
  // children: [];
  // isLoaded: boolean;
  // paramsGetTask: IParms;
  // orderBy: string;
  // asc: boolean;
}

class LTask extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      // children: [],
    };
    // this.onChangeSelect = this.onChangeSelect.bind(this);
  }

  componentDidUpdate() {
    // this.props.GetTasks({
    //   variable: 'id',
    //   order: 'ASC',
    // });
    console.log('');
    // TODO : update
    // this.ltaskControl.getTasks();
    // this.setState({
    //     items: this.ltaskControl.getTasks().data,
    //     isLoaded: this.ltaskControl.getTasks().success,
    // });
    // this.addItem = this.addItem.bind(this);
  }

  // onChangeSelect(e: SelectChangeEvent<string>) {
  //   // TODO see params
  //   this.setState({
  //     order: e.target.value,
  //   });
  // }

  render() {
    // const state = this.state;
    // let children = [];
    const { tasks } = this.props;
    // const { tasks } = this.state;

    const children = tasks.map((task: ITask<Date>): any => (
      <Task
        key={task.id}
        task={task}
        RemoveTask={this.props.RemoveTask}
        // SetActivated={this.props.SetActivated}
      />
    ));
    return (
      <Box sx={{
        width: '50vw',
      }}
      >
        {/* <div className="mainToDo"> */}
        {/* <div>{ this.state.isLoaded }</div> */}
        {/* <div>{ this.state.error }</div> */}
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
