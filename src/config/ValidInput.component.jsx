import React, { Component } from "react";

import { validateField, validateModel, updateErrors } from "../config/Validator";

export default class ValidInput extends Component {

  componentWillReceiveProps(newProps) {
    console.log("received props");
    if (newProps.value) {
      console.log("change of value")
    }
  }

  render() {
    const { name, errors } = this.props;
    const myErrors = errors[name];
    console.log(name)
    console.log(errors)
    return (
      <span>
        <input
          {...this.props}
        />
        { myErrors !== undefined ?
          <span>
            { myErrors }
          </span>
            :
          <span>
          </span>
        }
      </span>
    )
    return (
      <div>
        <p>So many errors.. { Object.keys(errors).length } </p>
        is my error?
        { errors[name] !== undefined ?
          <span>
            yes { errors[name] }
          </span>
            :
          <span>
            no
          </span>
        }
      </div>
    );
  }
}