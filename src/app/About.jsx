import React, { Component } from "react";

export default class About extends Component {

  render() {
    return (
      <div>
        <p>Grappa is a digital secretary made to help the process of getting theses accepted.</p>
        <p>
          Created for University of Helsinki, it was made in 2016 during 7-week software production project from March to May by
          Teemu Koivisto, Jesse Väisänen, Henri Piiroinen, Essi Salmenkivi and Mikael Wide. During the summer of 2016 much of the
          missing features were completed by Teemu Koivisto. Its source code can be found in GitHub and it's under MIT license
          all rights belonging to the University of Helsinki.
        </p>
        <p>
          Admin at the time of finishing this app was Kjell Lemström.
        </p>
        <div className="ui large source button" >
          <a href="https://github.com/ultra-hyper-storm-ohtuprojekti" target="_blank">
            <i className="docs code icon"></i> Source code
          </a>
        </div>
      </div>
    );
  }
}
