import React from 'react';
interface IProps {};
interface IState {};

class ButtonBar extends React.Component <IProps , IState>{
    constructor(props: IProps){
      super(props);

    }
    render(){
      return (
        <div className="ButtonBar">
            {/* <input type="button" value="X"/> */}
            {/* <input type="button" value="Modificar" /> */}
        </div>
       
      ); 
    }
  }
  export default ButtonBar;