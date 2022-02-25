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

interface IProps {
  GetTasks(paramsGetTask: any): Promise<boolean>;
  optionDescription: {
    [key: string]: string
  }[];
  defaultValue: string; // default value should be in optionDescription
}

interface IState {
  order: string,
  asc: boolean
}

class Order extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      // children: [],
      order: this.props.defaultValue,
      asc: true,
    };
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
  }

  onClickButton(e: any) {
    this.setState({
      asc: e.target.value,
    });
    this.props.GetTasks({
      variable: this.state.order,
      order: this.state.asc ? 'ASC' : 'DESC',
    });
  }

  onChangeSelect(e: SelectChangeEvent<string>) {
    // TODO see params
    this.setState({
      order: e.target.value,
    });
    this.props.GetTasks({
      variable: this.state.order,
      order: this.state.asc ? 'ASC' : 'DESC',
    });
    // this.props.GetTasks(this.state);
  }

  render() {
    const menuItems = this.props.optionDescription
      .map((data: { [k: string]: string }) => (
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
        }}
      >
        <FormControl
          sx={{
            width: '80%',
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
            value={this.state.order}
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
            height: '60px',
          }}
          onClick={this.onClickButton}

        >
          {this.state.asc ? 'ASC' : 'DESC'}
        </Button>
      </Container>
    );
  }
}

export default Order;
