import React, { Component } from 'react';
import './App.css';
import Sensor from './Components/Sensor';
import axios from "axios"
import Led from './Components/Led';
import "tachyons"
import img from "./tntu.png"
import GitButton from "./Components/GitButton"

class App extends Component{
  state = {
    ledState:"",
    btnState:"on",
    ledErrMsg:"",
    isLoading:false,
    temperature:"",
    humidity:"",
    tempErr:"",
    blink:'',
    isBlinking:false
}

proxy = "http://192.168.0.100:8080"

changeToggleBtnState = ()=>{
  let {ledState} = this.state
  if(ledState === "light is off"){
    this.setState({btnState:"on"})
  }else{
    this.setState({btnState:"off"})
  }
}
toggle = ()=>{
  axios(`${this.proxy}/toggle`)
  .then(response => this.setState(()=>{
    return{
      ledState:response.data
    }
  },()=>this.changeToggleBtnState()))
  .catch(error => this.setState({ledErrMsg:"server is temporarily down"}))
}
//this.setState({isBlinking:false})
blinkToFalse = ()=>{
  setTimeout(()=>{
    this.setState({isBlinking:false})
  },7000)
}
blinkLed = ()=>{
  axios(`${this.proxy}/blink`)
 .then(response => this.setState(()=>{
   return{
     blink:response.data,
     isBlinking:true
   }
 },()=> this.blinkToFalse()))
 .catch(error => this.setState({ledErrMsg:"something went wrong"}))
}
getTempAndHumidity = ()=>{
  this.setState({isLoading:true})
  axios(`${this.proxy}/tempAndHumidity`)
  .then(response => this.setState({
    temperature:response.data.temperature,
    humidity:response.data.humidity,
    isLoading:false
  }))
  .catch(error => this.setState({tempErr:"server is down",isLoading:false}))
}

render(){
    const {temperature,humidity,isLoading,ledState,btnState,blink,isBlinking,ledErrMsg,
    tempErr} = this.state
  return (
    <React.Fragment>
    <h1 className="header">Raspberrypi IOT Project</h1>
    <GitButton/>
      <div className="main-box">
        <Sensor getTempAndHumidity={this.getTempAndHumidity} temperature={temperature}
        humidity={humidity} isLoading={isLoading} tempErr={tempErr}/>
        <Led ledState={ledState} blink={blink} isBlinking={isBlinking} ledErrMsg={ledErrMsg} 
        toggle={this.toggle} 
        blinkLed={this.blinkLed}
        btnState={btnState}/>
      </div>
      <img src={img} alt="img" className="tntu-img"/>
    </React.Fragment>
  );
}
}

export default App;
