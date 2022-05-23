import React from 'react';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import shortid from 'shortid';
// import Box from '@mui/material/Box';
// import { nanoid } from 'nanoid';

interface IProps {
  GetTasks(paramsGetTask: any): boolean;
  optionDescription: {
    [key: string]: string
  }[];
  defaultValue: string; // default value should be in optionDescription
}

interface IState {
  variable: string,
  order: boolean
}

class Order extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      // children: [],
      variable: this.props.defaultValue,
      order: true,
    };
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
  }

  onClickButton(): void {
    this.setState((prevState: IState) => ({
      order: !prevState.order,
    }));
    this.props.GetTasks({
      variable: this.state.variable,
      order: this.state.order ? 'ASC' : 'DESC',
    });
  }

  onChangeSelect(e: SelectChangeEvent<string>): void{
    this.setState({
      variable: e.target.value,
    });
    this.props.GetTasks({
      variable: this.state.variable,
      order: this.state.order ? 'ASC' : 'DESC',
    });
  }

  render(): any {
    const menuItems = this.props.optionDescription
      .map((data: { [k: string]: string }) => (
        // key={nanoid()}
        <MenuItem
          key={shortid.generate()}
          value={data.value}
        >
          {data.display}
        </MenuItem>
      ));

    return (
      <Container
        sx={{
          height: '100%',
          width: '100%',
          padding: '0',
          alignItems: 'stretch',
          display: 'flex',
        }}
      >
        <FormControl
          sx={{
            width: '90%',
          }}
        >

          <InputLabel
            id="demo-simple-select-label"
          >
            Order By
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.variable}
            label="Order By"
            onChange={this.onChangeSelect}
            sx={{
              height: '60px',
            }}
          >
            {menuItems.map((i: any) => i)}
            {/* <MenuItem value={2}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          sx={{
            borderRadius: '0',
            // height: '60px',
            width: '10%',
          }}
          onClick={this.onClickButton}

        >
          {this.state.order ? 'ASC' : 'DESC'}
        </Button>
      </Container>
    );
  }
}

export default Order;
