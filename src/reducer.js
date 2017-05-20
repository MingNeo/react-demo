import Rx from "rxjs";
import pubSub from "./pub-sub.js";

function user(state = {},action = {}) {
	switch (action.type) {
		case "UP_SUMMARY":
			return state => state.summary = action.text;
		case "UP_TEXT":
			return state => state.text = action.text;
		default:
			return state => state;
	}
}

function person(state = {},action = {}) {
	switch (action.type) {
		case "UP_SUMMARY1":
			return state => {
				state.text = action.text;
			};
		case "UP_TEXT":
			return state => state.text = action.text;
		default:
			return state => state;
	}
}

// 组合reducer
const reduncers = pubSub.combineReducers({
	user:user,
    person:person
})
export default reduncers;