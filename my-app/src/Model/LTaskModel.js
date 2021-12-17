import mysql from 'mysql';

class LTaskModel{
  constructor(props){ 
    super(props);
    this.props=props

    this.state={
      //  LTaskModel: null,
       host:this.props.host+'',
       user:this.props.users+'',
       pw:this.props.pw+'',
       db:this.props.db+''
    }

    this.getTasks = this.getTasks.bind(this);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.modifyTask = this.modifyTask.bind(this);
  }
  // static Singleton(host, user, pw, db){
  //   if (this.state.LTaskModel === null){
  //     this.setState({
  //       LTaskModel:new LTaskNodel(host, user, pw, db)
  //     });
  //   }
  // }
  getTasks(){

  }
  addTask(){

  }
  modifyTask(){

  }
  removeTask(){

  }
}
export default LTaskModel;