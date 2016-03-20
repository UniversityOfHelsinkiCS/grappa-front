import React, { Component } from 'react';
import { connect } from 'react-redux';

import App from "../components/App.component"
/*
const mapStateToProps = (state) => (){};

const mapDispatchToProps = (dispatch) => (){};

export default connect(mapStateToProps, mapDispatchToProps)(App);
*/
export default connect()(App);
