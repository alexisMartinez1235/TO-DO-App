import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

class TItem extends React.Component{
  constructor(props){
        super(props);
        this.props=props
        this.state={
          awake:true
        }
        this.removeItem = this.removeItem.bind(this);
    }
    removeItem(){
      this.setState({
        awake:false
      });
    }
    render(){
      if(this.state.awake){
          return (
            <Box sx={{
                display:'flex', 
                justifyContent: 'left', 
              }} 
            >
            {/* <div class="LItemAgregado"> */}
              <Checkbox
                checked={!this.state.awake}
                onChange={this.removeItem} />

              <Typography variant="h4"
                component="h4" 
                maxRows='30' >
                {this.props.tarea}
                
              </Typography>

              <Typography 
                  variant="h4" component="h2" ml="auto">
                {this.props.expirationDate}
              </Typography>
            </Box >
          );    
      }
      return false
    }
  }
  
  export default TItem;