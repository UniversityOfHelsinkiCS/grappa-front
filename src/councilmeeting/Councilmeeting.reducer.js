import { fromJS } from "immutable";

import {
	COUNCILMEETING_GET_ALL_SUCCESS,
	COUNCILMEETING_GET_ALL_FAILURE,

	COUNCILMEETING_SAVE_ONE_SUCCESS,
	COUNCILMEETING_SAVE_ONE_FAILURE,


} from "./councilmeeting.actions";

const INITIAL_STATE = fromJS({
	councilmeetinglist: [
	{
		id: 1,
		date: Date.now();
	},
	{
		id: 2,
		date: Date.now();
	},
	{
		id: 3,
		date: Date.now();
	},
	],
});

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case COUNCILMEETING_SAVE_ONE_SUCCESS: 
		return state.merge().councilmeetinglist.push(action.payload);
		default: 
		return state;
	};
}



