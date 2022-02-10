import React from 'react';

interface IProps {}
interface IState {}

class ButtonBar extends React.PureComponent <IProps, IState> {
  render() {
    return (
      <div className="ButtonBar">
        {/* <input type="button" value="X"/> */}
        {/* <input type="button" value="Modificar" /> */}
      </div>
    );
  }
}
export default ButtonBar;
