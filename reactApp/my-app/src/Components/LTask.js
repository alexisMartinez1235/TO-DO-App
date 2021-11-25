import React from 'react';
import LInput from './LInput';
import LItem from './LItem'

class LTask extends React.Component{
    constructor(props){
      super(props);
      this.props=props
      this.state={
        items: []
      }
      this.addItem = this.addItem.bind(this);
    }
    addItem(nombre){
      // alert('Descripcion tarea:  '+nombre);
      this.state.items.map(item => {
        alert(item);
      });

      this.setState({ 
        items: [this.state.items, nombre]
      });
      this.render();
    }

    render(){
      const children = [];
      for (var i = 0; i < this.state.items.lenght; i += 1) {
        children.push(<LItem key={i} number={i} tarea={this.state.items[i]} />);
      }
      return (
        <div>
          <div class="LTask">
            {children}
          </div>
          <LInput addItem={this.addItem}/>
        </div>
      ); 
  }
}

export default LTask;