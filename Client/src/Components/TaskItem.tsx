import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface IProps {
  key: number,
  number: number,
  txtTask: string,
  expirationDate: Date | null
}

interface IState {
  awake: Boolean,
}

class TItem extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      awake: true,
    };
    this.removeItem = this.removeItem.bind(this);
    this.getDate = this.getDate.bind(this);
  }

  getDate() {
    if (this.props.expirationDate !== null) {
      return this.props.expirationDate.toLocaleDateString();
    }
    return false;
  }

  removeItem() {
    this.setState({
      awake: false,
    });
  }

  render() {
    if (this.state.awake) {
      return (
        <Box sx={{
          display: 'flex',
          justifyContent: 'left',
        }}
        >
          {/* <div className="LItemAgregado"> */}
          <Checkbox
            checked={!this.state.awake}
            onChange={this.removeItem}
          />

          <Typography
            variant="h4"
            component="h4"
            // maxRows="3"
          >
            {this.props.txtTask}
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

export default TItem;
