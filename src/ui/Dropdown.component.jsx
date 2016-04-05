import React, { Component } from "react";
import ThesisCreate from "../thesis/ThesisCreate.smart";
export default class Dropdown extends Component {

  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    if(this.props.onChange) {
      this.props.onChange(event);
    }
  }

  render(){
    const {data} = this.props;
    let active: "Select Date";
    console.log(data);
    return(
      <select className="ui fluid search dropdown" value={active} onChange={this.handleChange}>
        {data.map(function(date, index){
          return <option key={ index } value={date.date}>{date.date}</option>
        })}
      </select>
    )
  }

}
