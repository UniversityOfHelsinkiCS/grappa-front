export const CALL_API = Symbol("CALL_API");

import axios from "axios";

export const requestTest = () => {
  console.log("making a test request!");
  axios.get("/theses")
  .then(function(res) {
    console.log("yo gettasin datan testiapista:", res);
  })
  .catch(function(err) {
  	console.log("vituix meni request " + err)
  })
}