import axios from 'axios';

interface User {
  user : string,
  password : string
};

class LTask{
  constructor(){
  // constructor(props : any){ 
    // super(props);
    // this.props=props

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  addItem(nombre : string,expirationDate : Date | null){
    // fetch()
    return nombre == "" && (expirationDate);
  }

  async getTasks(){
    let user : User;
    try {
      const { data } = await axios.get('/getTasks');
      user = data.userDetails;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      } else {
        console.log(error);
      }
    }

    // let headersList = {
    //   Accept: "*/*",
    //   ContentType: "application/json" 
    // }
  
    // let reqOptions = {
    //   url: "http://api_server:5000/getTasks",
    //   method: "GET",
    //   headers: headersList,
    //   data: "{\n    \"variable\":\"ID\",\n    \"order\":\"ASC\"\n}",
    // }
  
    // axios.request(reqOptions).then(function (response : any) {
    //   console.log(response.data);
    // })
  }
  
  removeItem(){
     return 1;
  }
}

export default LTask;