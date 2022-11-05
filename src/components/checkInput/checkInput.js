import React from 'react'

const checkInput = () => {
  const showResult = (input) => {
    const msg = {} 
    msg.input = "Please input " + input;
  }

  
  const checkEmpty = (values) => {
    // inputList.map((input,index)=>{
    //   if(!input!==""){
    //     console.log(inputList[index]);
    //   }
    // })

    for (let v in values){
      if(values[v]===""){
        console.log("1",values[v].name)
      }
    }

  }

  const checkEmail = () => {

  }

  const checkLength = (values) => {
      //values.map;
  }
  return {
    checkEmpty
  }
}

export default checkInput
