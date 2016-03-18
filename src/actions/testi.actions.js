//import * as types from "../constants/"

export const DO_STUFF = {
	type: "DO_STUFF",
	doingStuff: true
}

export const doActionSomething = () => {
	console.log("I did something as a action! woo");
	return DO_STUFF;
}