import React, { Component } from "react";

export default class Error extends Component {

  render() {
    const { errors, model, field } = this.props;
    const list = errors[`${model}_${field}`] || [];
    // console.log(errors)
    // console.log(field)
    // console.log(list)
    if (list.length === 0) {
      return (
        <div></div>
      );
    }
    return (
      <div {...this.props} className="my-error-box">
        <ul className="my-error-list">
          { list.map((error, index) => <li key={index}>{error}</li>) }
        </ul>
      </div>
    );
  }

  // render() {
  //   const { errors } = this.props;
  //   console.log(errors)
  //   if (!errors || errors.length === 0) {
  //     return (
  //       <div></div>
  //     );
  //   }
  //   return (
  //     <div {...this.props} className="my-error-box">
  //       <ul className="my-error-list">
  //         { errors.map((error, index) => <li key={index}>{error}</li>) }
  //       </ul>
  //     </div>
  //   );
  // }
}

          // { list[0] }
          // { list.map((error, index) => <span key={index} className="m-left">{error}</span>) }
          // { list.map((error, index) => <span key={index}>{error}</span>) }

            // <div className="my-error">
            //   <span className="my-error-msg">
            //     { this.state.errors["thesis_authorFirstname"] }
            //   </span>
            // </div>
        //             <ul className="my-error-msg">
        //   { list.map((error, index) => <li key={index}>{error}</li>) }
        // </ul>