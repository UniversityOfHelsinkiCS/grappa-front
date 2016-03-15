import React from "react";
import ReactDOM from 'react-dom';

var MyComponent = React.createClass({
    render: function(){
	return (
	    <h1>Hello, {this.props.name}!</h1>
	);
    }
});

ReactDOM.render(<MyComponent name="Handsome" />, document.getElementById('app'));

console.log("hei");

