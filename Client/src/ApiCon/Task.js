import React from 'react';


class LTask{
  constructor(props){ 
    super(props);
    this.props=props

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  addItem(nombre,expirationDate){
    // fetch()
    return 1
  }

  // async function getTasks(){
  //   let headersList = {
  //     "Accept": "*/*",
  //     "Content-Type": "application/json" 
  //   }
  
  //   let reqOptions = {
  //     url: "http://api_server:5000/getTasks",
  //     method: "GET",
  //     headers: headersList,
  //     data: "{\n    \"variable\":\"ID\",\n    \"order\":\"ASC\"\n}",
  //   }
  
  //   axios.request(reqOptions).then(function (response) {
  //     console.log(response.data);
  //   })
  // }
  
  removeItem(){
     return 1;
  }
}

export default LTask;